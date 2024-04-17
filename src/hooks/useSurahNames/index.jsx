import React, { useEffect, useState } from "react";

const useSurahNames = () => {
  const [surahNames, setSurahNames] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetData = async () => {
      const dbName = "localdb";
      const storeName = "surahs-index";

      try {
        const request = window.indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore(storeName, { keyPath: "id" });
        };

        request.onsuccess = async (event) => {
          const db = event.target.result;
          const transaction = db.transaction([storeName], "readonly");
          const store = transaction.objectStore(storeName);
          const data = await getAllData(store);

          if (data.length === 114) {
            setSurahNames(data);
            setIsLoading(false);
          } else {
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
            }
            await storeData(db, storeName, fetchedData);
            setSurahNames(fetchedData.surahs);
            setIsLoading(false);
          }
        };

        request.onerror = (event) => {
          console.error(
            "Error opening IndexedDB database:",
            event.target.error
          );
        };
      } catch (error) {
        setError(error);
        console.error("Error fetching or storing data:", error);
      }
    };

    GetData();
  }, []);
  async function getAllData(store) {
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (event) => {
        reject(event.target.error);
        setError(event.target.error);
      };
    });
  }

  async function storeData(db, storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      data.surahs.forEach((item) => {
        store.put(item);
      });
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = (event) => {
        reject(event.target.error);
        setError(event.target.error);
      };
    });
  }
  return { surahNames, isLoading, error };
};

export default useSurahNames;
