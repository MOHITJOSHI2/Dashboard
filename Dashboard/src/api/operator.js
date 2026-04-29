const API_URL = import.meta.env.VITE_API_URL;
export const fetchOperators = async () => {
  const res = await fetch(`${API_URL}/data/getData`);

  if (!res.ok) {
    throw new Error("failed to fetch operators");
  }
  return res.json();
};
