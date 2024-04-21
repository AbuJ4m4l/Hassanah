import { useEffect, useState } from "react";
const useSurahNames = () => {
  const [surahNames, setSurahNames] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await fetch(
          "http://38.242.214.31:3002/api/v1/surahs/all"
        );
        const fetchedData = await response.json();

        if (!response.ok) {
          if (fetchedData.error) {
            setError(fetchedData.error);
          } else {
            setError("Network response was not ok");
          }
          setIsLoading(false);
        } else {
          setSurahNames(fetchedData.surahs);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching or storing data:", error);
      }
    };

    GetData();
  }, []);

  return { surahNames, isLoading, error };
};

export default useSurahNames;
