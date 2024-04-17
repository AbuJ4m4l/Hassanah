import SurahsIndex from "../../../../components/surahsIndex";

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
