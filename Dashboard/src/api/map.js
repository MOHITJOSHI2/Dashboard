// /map/getWards + /map/getDistrictsconst API_URL = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_API_URL;
// Ward boundaries
export const fetchWards = async () => {
  const res = await fetch(`${API_URL}/map/getWards`);

  if (!res.ok) {
    throw new Error("Failed to fetch wards");
  }

  return res.json();
};

// District boundaries
export const fetchDistricts = async () => {
  const res = await fetch(`${API_URL}/map/getDistricts`);

  if (!res.ok) {
    throw new Error("Failed to fetch districts");
  }

  return res.json();
};
