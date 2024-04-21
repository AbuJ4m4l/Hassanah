"use client";
import { Changa, Russo_One } from "next/font/google";
import React, { useEffect, useState } from "react";

export const russo = Russo_One({ weight: ["400"], subsets: ["latin"] });
export const changa = Changa({ weight: ["600"], subsets: ["arabic"] });

const Surah = ({ params: { surahId, locale } }) => {
  const [surah, setSurah] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    const GetSurah = async () => {
      try {
        const response = await fetch(
          `http://38.242.214.31:3002/api/v1/surah/${surahId}?lang=${locale}`
        );
        const data = await response.json();
        if (response.ok) {
          setSurah(data.surah);
        } else {
          setError(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    GetSurah();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <h1 className={locale === "ar" ? changa.className : russo.className}>
          {locale === "ar" ? surah.name : surah.englishName}
        </h1>
      </div>
    </>
  );
};

export default Surah;
