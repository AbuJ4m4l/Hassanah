"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import useSurahNames from "../../hooks/useSurahNames";
import { Changa, Russo_One } from "next/font/google";

export const russo = Russo_One({ weight: ["400"], subsets: ["latin"] });
export const changa = Changa({ weight: ["600"], subsets: ["arabic"] });

const SurahsIndex = ({ locale }) => {
  const { surahNames, error, isLoading } = useSurahNames();
  const t = useTranslations("quran");
  return (
    <>
      {error ? (
        <div></div>
      ) : (
        <>
          <div className="flex justify-center mt-4">
            <h1
              className={`${
                locale === "en" ? russo.className : changa.className
              } text-2xl mb-4`}
            >
              {t("surahs")}
            </h1>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 px-4 xl:px-[300px]">
            {surahNames.map((surah) => (
              <>
                <div>
                  <Link className="text-foreground" href={`/surah/${surah.id}`}>
                    <div
                      key={surah.id}
                      tabIndex={0}
                      className={`cursor-pointer dark:bg-[#171717] dark:hover:bg-[#101010] bg-[#fff] hover:bg-[#f8f5f5] p-4 rounded-md flex flex-col focus:outline-none focus-visible:ring focus-visible:ring-focus focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#171717] focus-visible:ring-offset-[#f8f5f5]`}
                    >
                      <div className="flex flex-row">
                        <div className="rtl:ml-2 ltr:mr-2 rounded-full px-4 py-2 bg-[#d0d0d0] !text-white dark:bg-[#060606]">
                          {surah.id}
                        </div>
                        <div className="mt-2">
                          {locale === "ar" ? surah.name : surah.englishName}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-medium mt-2">
                        {locale === "ar" ? (
                          <>
                            {t(`revelationType.${surah.revelationType}`)} -{" "}
                            {surah.totalAyahs} {t("total_ayahs")}
                          </>
                        ) : (
                          <>
                            {surah.englishNameTranslation} -{" "}
                            {t(`revelationType.${surah.revelationType}`)} -{" "}
                            {surah.totalAyahs} {t("total_ayahs")}
                          </>
                        )}
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SurahsIndex;
