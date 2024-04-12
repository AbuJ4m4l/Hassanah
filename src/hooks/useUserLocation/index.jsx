"use client";
import { useState, useEffect } from "react";

const useUserLocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            setIsLoading(false);
          },
          (err) => {
            setError(err.message);
            setIsLoading(false);
          },
          { enableHighAccuracy: true }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setIsLoading(false);
      }
    };

    getUserLocation();
  }, []);

  return { position, error, isLoading };
};

export default useUserLocation;