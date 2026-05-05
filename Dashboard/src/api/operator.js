const API_URL = import.meta.env.VITE_API_URL;
export const fetchOperators = async () => {
  const res = await fetch(`https://dashboard-1-8c4w.onrender.com/data/getData`);

  if (!res.ok) {
    throw new Error("failed to fetch operators");
  }
  return res.json();
};
