import SurahsIndex from "../../../../components/surahsIndex";

const Quran = ({ params: { locale } }) => {
  return (
    <>
      <SurahsIndex locale={locale} />
    </>
  );
};

export default Quran;
