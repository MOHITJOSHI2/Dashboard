import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const ResizeMap = ({ isOpen }) => {
  const map = useMap();
  useEffect(() => {
    // Wait for the sidebar animation (300ms) to finish, then tell Leaflet to check its size
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [isOpen, map]);
  return null;
};

export default ResizeMap;
