import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import SideBar from "../components/SideBar";
// import CustomSelect from "../components/CustomSelect";
import MapDataLayer from "../components/MapDataLayer";

// Styles
import "leaflet/dist/leaflet.css";
import boundaryData from "../data/boundary.json";

// Fix for default marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- 1. NEPAL MASK (Glassmorphic Outer) ---
const NepalMask = ({ feature, maskColor }) => {
  if (!feature || !feature.geometry) return null;
  const worldCoords = [
    [-180, 90],
    [-180, -90],
    [180, -90],
    [180, 90],
    [-180, 90],
  ];
  const nepalRing = feature.geometry.coordinates[0];
  const maskData = {
    type: "Feature",
    geometry: { type: "Polygon", coordinates: [worldCoords, nepalRing] },
  };

  return (
    <GeoJSON
      data={maskData}
      style={{
        fillColor: maskColor,
        fillOpacity: 0.9,
        color: "none",
        weight: 0,
      }}
      interactive={true}
      eventHandlers={{
        mousedown: (e) => L.DomEvent.stopPropagation(e),
        click: (e) => L.DomEvent.stopPropagation(e),
      }}
    />
  );
};

// --- 2. MAP CONTROLLER (Resize & Search Logic) ---
const MapController = ({
  isOpen,
  feature,
  searchQuery,
  setDistrictBoundary,
}) => {
  const map = useMap();

  useEffect(() => {
    const interval = setInterval(() => map.invalidateSize(), 10);
    const timer = setTimeout(() => {
      clearInterval(interval);
      map.invalidateSize();
    }, 400);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isOpen, map]);

  useEffect(() => {
    if (feature) {
      const bounds = L.geoJSON(feature).getBounds();
      map.fitBounds(bounds, { padding: [20, 20], animate: false });
      map.setMaxBounds(bounds);
      map.setMinZoom(map.getBoundsZoom(bounds));
    }
  }, [feature, map]);

  // useEffect(() => {
  //   if (!searchQuery) return;
  //   const performSearch = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  //           searchQuery
  //         )}&polygon_geojson=1&limit=1`
  //       );
  //       const data = await response.json();
  //       if (data && data.length > 0 && data[0].geojson) {
  //         const geometry = data[0].geojson;
  //         setDistrictBoundary(geometry);
  //         map.flyToBounds(L.geoJSON(geometry).getBounds(), {
  //           padding: [50, 50],
  //           duration: 1.5,
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Search failed:", err);
  //     }
  //   };
  //   performSearch();
  // }, [searchQuery, map, setDistrictBoundary]);

  return null;
};

// --- 3. MAIN MAP PAGE ---
const Map = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [nepalFeature] = useState(boundaryData.features[0]);
  const [filters, setFilters] = useState({ province: "", district: "" });
  const [searchTrigger, setSearchTrigger] = useState("");
  const [districtBoundary, setDistrictBoundary] = useState(null);

  const colors = {
    bg: "#F8FAFC",
    emerald: "#10B981",
    slate: "#0F172A",
    highlight: "#10B981", // Matching emerald theme
  };

  const handleExplore = () => {
    setDistrictBoundary(null);
    if (filters.district) {
      setSearchTrigger(`${filters.district} District, Nepal`);
    } else if (filters.province) {
      setSearchTrigger(`${filters.province} Province, Nepal`);
    } else {
      setSearchTrigger("");
    }
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ backgroundColor: colors.bg }}
    >
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 relative h-full flex flex-col">
        <MapContainer
          center={[28.3949, 84.124]}
          zoom={7}
          preferCanvas={true} // <--- MANDATORY for 6,000+ polygons
          style={{ height: "100%", width: "100%" }}
        >
          {/* Minimalist CartoDB Tiles */}
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          <MapController
            isOpen={isOpen}
            feature={nepalFeature}
            searchQuery={searchTrigger}
            setDistrictBoundary={setDistrictBoundary}
          />
          <MapDataLayer />
          <NepalMask feature={nepalFeature} maskColor={colors.bg} />

          <GeoJSON
            data={nepalFeature}
            style={{ color: colors.slate, weight: 1.5, fillOpacity: 0 }}
          />

          {districtBoundary && (
            <GeoJSON
              key={JSON.stringify(districtBoundary)}
              data={districtBoundary}
              style={{
                color: colors.highlight,
                weight: 3,
                dashArray: "6, 8",
                fillColor: colors.highlight,
                fillOpacity: 0.1,
              }}
            />
          )}
        </MapContainer>
      </main>

      {/* Modern Info Panel */}
      <aside className="w-80 bg-white border-l border-slate-100 p-8 flex flex-col gap-6 z-[1001] shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
        <div>
          <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">
            Region Focus
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mt-1">
            Nepal Map
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Current Selection
          </p>
          <p className="text-lg font-black text-slate-800">
            {filters.district
              ? `${filters.district}`
              : filters.province
              ? filters.province
              : "Entire Country"}
          </p>
          {filters.province && (
            <p className="text-xs font-semibold text-emerald-600 italic">
              Province: {filters.province}
            </p>
          )}
        </div>

        <div className="mt-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-800 leading-relaxed">
          The map view is automatically constrained to the national boundaries
          of Nepal.
        </div>
      </aside>
    </div>
  );
};

export default Map;
