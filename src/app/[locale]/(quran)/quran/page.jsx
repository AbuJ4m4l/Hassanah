import SurahsIndex from "../../../../components/surahsIndex";

export const russo = Russo_One({ weight: ["400"], subsets: ["latin"] });
export const changa = Changa({ weight: ["600"], subsets: ["arabic"] });

const Quran = ({ params: { locale } }) => {
  return (
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
      <SurahsIndex locale={locale} />
    </>
  );
};

export default Quran;
