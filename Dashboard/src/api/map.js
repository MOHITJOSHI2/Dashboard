
// Ward boundaries
export const fetchWards = async () => {
  const res = await fetch(`https://dashboard-1-8c4w.onrender.com/map/getWards`);

  if (!res.ok) {
    throw new Error("Failed to fetch wards");
  }

  return res.json();
};

// District boundaries
export const fetchDistricts = async () => {
  const res = await fetch(`https://dashboard-1-8c4w.onrender.com/map/getDistricts`);

  if (!res.ok) {
    throw new Error("Failed to fetch districts");
  }

  return res.json();
};
