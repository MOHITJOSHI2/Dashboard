import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

//componets
import Sidebar from "../components/SideBar";
import nepalBoundary from "../data/boundary.json";

// APIs
import { fetchOperators } from "../api/operator";
import { fetchWards } from "../api/map";

// Constants
const PROVINCES = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];

// Leaflet icon fix
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import LoadingSpinner from "../components/LoadingSpinner";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// 🔥 Marker with ward count
const getMarkerIcon = (status, wardCount) => {
  let color = "#94a3b8";

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background:${color};
        width:32px;
        height:32px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-size:12px;
        font-weight:bold;
        border:3px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
      ">
        ${wardCount}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

//Helps to fit nepal boundary
function FitNepalBounds() {
  const map = useMap();

  useEffect(() => {
    const layer = L.geoJSON(nepalBoundary);
    map.fitBounds(layer.getBounds());
  }, [map]);

  return null;
}

export default function Map() {
  const [operators, setOperators] = useState([]);
  const [wardsGeoJSON, setWardsGeoJSON] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProvinces, setSelectedProvinces] = useState(PROVINCES);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [opRes, wardRes] = await Promise.all([
          fetchOperators(),
          fetchWards(),
        ]);

        const wardFeatures = wardRes.features || [];
        setWardsGeoJSON(wardRes);

        const matched = opRes.data
          .map((op) => {
            const dist = op.Location?.District_Name?.toLowerCase().trim() || "";
            const muni =
              op.Location?.Municipality_Name?.toLowerCase().trim() || "";

            // Robust ward parsing
            let targetWards = [];
            if (Array.isArray(op.Wards_Covered)) {
              targetWards = op.Wards_Covered.flatMap((w) => w.split(","))
                .map((n) => parseInt(n.trim()))
                .filter((n) => !isNaN(n));
            }

            // Match wards
            const matchingFeatures = wardFeatures.filter((f) => {
              const fDist = f.properties.DISTRICT?.toLowerCase().trim();
              const fMuni = f.properties.GaPa_NaPa?.toLowerCase().trim();
              const fWardNo = f.properties.NEW_WARD_N;

              const isSameArea = fDist === dist && fMuni === muni;

              if (targetWards.length > 0) {
                return isSameArea && targetWards.includes(fWardNo);
              }
              return isSameArea;
            });

            // Centroid calc
            let lat = 0,
              lng = 0,
              count = 0;

            matchingFeatures.forEach((f) => {
              const coords =
                f.geometry.type === "Polygon"
                  ? [f.geometry.coordinates[0]]
                  : f.geometry.coordinates;

              coords.forEach((ring) => {
                ring.forEach((p) => {
                  lng += p[0];
                  lat += p[1];
                  count++;
                });
              });
            });

            return {
              ...op,
              lat: count ? lat / count : null,
              lng: count ? lng / count : null,
              foundWardsCount: matchingFeatures.length,
              actualWardsRequested: targetWards,
              matchedWards: matchingFeatures.map((f) => ({
                wardNo: f.properties.NEW_WARD_N,
                municipality: f.properties.GaPa_NaPa,
                district: f.properties.DISTRICT,
                density: f.properties.density_final,
              })),
            };
          })
          .filter((op) => op.lat !== null);

        setOperators(matched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const mapCenter =
    operators.length > 0
      ? [operators[0].lat, operators[0].lng]
      : [28.3949, 84.124];

  return (
    <div className="h-screen flex gap-4 font-sans">
      {/* Sidebar */}
      <div className="">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="w-64 bg-white p-5 rounded-xl shadow border">
        <h3 className="font-bold text-sm mb-4 uppercase">Province Filters</h3>

        {PROVINCES.map((p) => (
          <label key={p} className="flex gap-2 text-xs mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedProvinces.includes(p)}
              onChange={() =>
                setSelectedProvinces((prev) =>
                  prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
                )
              }
            />
            {p}
          </label>
        ))}
      </div>

      {/* Map */}
      <div className="flex-1 relative rounded-xl overflow-hidden shadow">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <MapContainer
            center={mapCenter}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Ward polygons */}
            {nepalBoundary && (
              <GeoJSON
                data={nepalBoundary}
                style={{
                  color: "#1e40af", // border color
                  weight: 2,
                  fillColor: "#3b82f6",
                  fillOpacity: 0.1,
                }}
              />
            )}

            <FitNepalBounds />

            {/* Markers */}
            {operators
              .filter((op) =>
                selectedProvinces.includes(op.Location?.Province_Name)
              )
              .map((op) => (
                <Marker
                  key={op._id}
                  position={[op.lat, op.lng]}
                  icon={getMarkerIcon(op.status, op.foundWardsCount)}
                >
                  <Tooltip sticky>
                    <div className="text-xs">
                      <strong>{op.WSUC_Name}</strong>
                      <br />
                      Wards: {op.foundWardsCount}
                    </div>
                  </Tooltip>

                  <Popup>
                    <div className="text-center">
                      <p className="font-bold">{op.WSUC_Name}</p>
                      <button
                        onClick={() => setSelectedProject(op)}
                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      >
                        View Analytics
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        )}

        {/* 🔥 Analytics Panel */}
        {selectedProject && (
          <div className="absolute top-4 right-4 w-80 bg-white shadow-2xl rounded-xl p-4 z-[1000] border">
            <div className="flex justify-between mb-2">
              <h2 className="font-bold text-sm text-blue-900">
                {selectedProject.WSUC_Name}
              </h2>
              <button onClick={() => setSelectedProject(null)}>✕</button>
            </div>

            <div className="text-xs space-y-1 mb-3">
              <p>
                <strong>Province:</strong>{" "}
                {selectedProject.Location?.Province_Name}
              </p>
              <p>
                <strong>District:</strong>{" "}
                {selectedProject.Location?.District_Name}
              </p>
              <p>
                <strong>Municipality:</strong>{" "}
                {selectedProject.Location?.Municipality_Name}
              </p>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-100 p-2 text-center rounded">
                <p className="text-[10px]">SPI</p>
                <p className="font-bold text-blue-600">
                  {selectedProject.Summary_Index?.SPI || 0}%
                </p>
              </div>

              <div className="bg-gray-100 p-2 text-center rounded">
                <p className="text-[10px]">CPI</p>
                <p className="font-bold text-green-600">
                  {selectedProject.Summary_Index?.CPI || 0}%
                </p>
              </div>
            </div>

            {/* Wards */}
            <div>
              <h3 className="text-xs font-bold mb-2">
                Wards Covered ({selectedProject.matchedWards.length})
              </h3>

              <div className="max-h-40 overflow-y-auto text-xs space-y-1">
                {selectedProject.matchedWards.map((w, i) => (
                  <div key={i} className="border p-2 rounded bg-gray-50">
                    <p>
                      <strong>Ward:</strong> {w.wardNo}
                    </p>
                    <p>
                      <strong>Municipality:</strong> {w.municipality}
                    </p>
                    <p>
                      <strong>Density:</strong> {w.density}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// export default function Map() {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="flex">
//       <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
//       <h1 className="text-2xl m-auto">Geo-coded Data Under Construction</h1>
//     </div>
//   );
// }
