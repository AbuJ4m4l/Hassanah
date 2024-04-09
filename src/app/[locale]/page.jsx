"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [surahNames, setSurahNames] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      const dbName = "surah-database";
      const storeName = "surahs";

      try {
        // Open the IndexedDB database
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

          if (data.length > 0) {
            setSurahNames(data);
          } else {
            const response = await fetch(
              "http://38.242.214.31:3002/api/v1/surahs/all"
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const fetchedData = await response.json();
            await storeData(db, storeName, fetchedData);
            setSurahNames(fetchedData);
          }
        };

        request.onerror = (event) => {
          console.error(
            "Error opening IndexedDB database:",
            event.target.error
          );
        };
      } catch (error) {
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
      };
    });
  }
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Surah Names</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 px-4 xl:px-[300px]">
        {surahNames.map((surah) => (
          <div key={surah.id} className="bg-[#171717] p-4 rounded-md">
            {surah.name}
            <p>{surah.englishName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
