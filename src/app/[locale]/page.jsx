"use client";

import { Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = ({ params: { locale } }) => {
  const [surahNames, setSurahNames] = useState([]);
  const router = useRouter();
  const t = useTranslations("home");
  useEffect(() => {
    const GetData = async () => {
      const dbName = "localdb";
      const storeName = "surahs";

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
            setSurahNames(fetchedData.surahs);
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
      <Divider />
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("surahs")}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 px-4 xl:px-[300px]">
        {surahNames.map((surah) => (
          <div
            key={surah.id}
            tabIndex={0}
            onClick={() => router.push(`/surah/${surah.id}`)}
            className={`cursor-pointer bg-[#171717] hover:bg-[#101010] p-4 rounded-md flex flex-col focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]`}
          >
            <div className="flex flex-row">
              <div className="rtl:ml-2 ltr:mr-2 rounded-full px-4 py-2 bg-[#060606]">
                {surah.id}
              </div>
              <div className="mt-2">
                {locale === "ar" ? surah.name : surah.englishName}
              </div>
            </div>
            <p className="text-slate-400 text-medium mt-2">
              {locale === "ar"
                ? surah.englishName
                : surah.englishNameTranslation}{" "}
              - {surah.totalAyahs} {t("total_ayahs")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
