"use client";

import { Button, Image, Link } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Changa, Russo_One } from "next/font/google";
import nextImage from "next/image";
import { Typewriter } from "react-simple-typewriter";

export const russo = Russo_One({ weight: ["400"], subsets: ["latin"] });
export const changa = Changa({ weight: ["600"], subsets: ["arabic"] });

const AboutPage = ({ params: { locale } }) => {
  const t = useTranslations("aboutUs");

  return (
    <div className="container !-mb-[60px] !-mt-9 space-y-14">
      <section className="select-none border-b border-divider bg-black/70 backdrop-blur-3xl px-10 py-8 md:px-[70px] lg:px-[200px] xl:px-[300px] 2xl:px-[400px] lg:py-16 w-full h-auto">
        <div className="flex flex-col md:flex-row">
          <div className="w-[280px]">
            <h1
              className={`p-3 bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-400 text-4xl sm:text-5xl ${
                locale === "en" ? russo.className : changa.className
              }`}
            >
              <Typewriter words={[t("heroSection.heading")]} typeSpeed={200} />
            </h1>
            <p className="mt-4 md:text-center">{t("heroSection.text")}</p>
          </div>
          <div className="flex justify-center md:block md:justify">
            <Image
              as={nextImage}
              width={300}
              height={300}
              alt="Connected"
              loading="lazy"
              src="/images/svg/connected.svg"
              className="md:rtl:mr-28 md:ltr:ml-28 md:mt-0 mt-9"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold">{t("header")}</h1>
        </div>
        <div className="mt-14 flex flex-col md:flex-row-reverse border-y border-divider bg-[#080808] backdrop-blur-3xl w-full h-auto py-10 md:px-[70px] lg:px-[200px] xl:px-[300px] 2xl:px-[600px]">
          <div className="md:items-center flex w-auto md:w-[400px] sm:px-12 px-6 md:p-0">
            <p className="mt-4 md:mt-0 text-center">{t("intro")}</p>
          </div>
          <div className="flex justify-center md:block md:justify">
            <Image
              as={nextImage}
              width={300}
              height={300}
              alt="Website Builder"
              loading="lazy"
              src="/images/svg/website_builder.svg"
              className="md:rtl:ml-28 md:ltr:mr-28 mt-9 md:mt-0"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold">{t("features.title")}</h1>
        </div>
        <div className="mt-14 flex flex-col md:flex-row border-y border-divider bg-[#060606] w-full h-auto py-10 md:px-[70px] lg:px-[200px] xl:px-[300px] 2xl:px-[600px]">
          <div
            id="p1"
            className="md:items-center flex w-auto md:w-[400px] sm:px-12 px-6 md:p-0"
          >
            <p className="mt-4 md:mt-0 text-center">{t("features.quran")}</p>
          </div>
          <div id="p1" className="flex justify-center md:block md:justify">
            <Image
              as={nextImage}
              width={300}
              height={300}
              alt="Book"
              loading="lazy"
              src="/images/svg/book.svg"
              className="md:rtl:mr-28 md:ltr:ml-28 mt-9 md:mt-0"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse border-b border-divider bg-[#080808] w-full h-auto py-10 md:px-[70px] lg:px-[200px] xl:px-[300px] 2xl:px-[600px]">
          <div className="md:items-center flex w-auto md:w-[400px] sm:px-12 px-6 md:p-0">
            <p id="p2" className="mt-4 md:mt-0 text-center">
              {t("features.hadiths")}
            </p>
          </div>
          <div className="flex justify-center md:block md:justify">
            <Image
              id="p2"
              as={nextImage}
              width={300}
              height={300}
              alt="Education"
              loading="lazy"
              src="/images/svg/education.svg"
              className="md:rtl:ml-28 md:ltr:mr-28 mt-9 md:mt-0"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row bg-[#060606] border-b border-divider w-full h-auto py-10 md:px-[70px] lg:px-[200px] xl:px-[300px] 2xl:px-[600px]">
          <div className="md:items-center flex w-auto md:w-[400px] sm:px-12 px-6 md:p-0">
            <p id="p3" className="mt-4 md:mt-0 text-center">
              {t("features.videos")}
            </p>
          </div>
          <div className="flex justify-center md:block md:justify">
            <Image
              id="p3"
              as={nextImage}
              width={300}
              height={300}
              alt="Video"
              loading="lazy"
              src="/images/svg/Video.svg"
              className="md:rtl:mr-28 md:ltr:ml-28 mt-9 md:mt-0"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse bg-[#080808] border-b border-divider w-full h-auto py-10 md:px-[70px] lg:px-[200px] xl:px-[300px] 2xl:px-[600px]">
          <div className="md:items-center flex w-auto md:w-[400px] sm:px-12 px-6 md:p-0">
            <p id="p4" className="mt-4 md:mt-0 text-center">
              {t("features.prayer")}
            </p>
          </div>
          <div className="flex justify-center md:block md:justify">
            <Image
              id="p4"
              as={nextImage}
              width={300}
              height={300}
              alt="Notify"
              loading="lazy"
              src="/images/svg/notify.svg"
              className="md:rtl:ml-28 md:ltr:mr-28 mt-9 md:mt-0"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row bg-[#060606] border-b border-divider w-full h-auto py-10 md:px-[70px] lg:px-[200px] xl:px-[300px] 2xl:px-[600px]">
          <div className="md:items-center flex w-auto md:w-[400px] sm:px-12 px-6 md:p-0">
            <p id="p5" className="mt-4 md:mt-0 text-center">
              {t("features.festivals")}
            </p>
          </div>
          <div className="flex justify-center md:block md:justify">
            <Image
              id="p5"
              as={nextImage}
              width={300}
              height={300}
              alt="Festival"
              loading="lazy"
              src="/images/svg/festival.svg"
              className="md:rtl:mr-28 md:ltr:ml-28 mt-9 md:mt-0"
            />
          </div>
        </div>
      </section>
      <section className="bg-black/70 border-t border-divider backdrop-blur-3xl px-10 py-8 lg:py-16 w-full h-auto">
        <div className="flex justify-center">
          <h1
            className={`${
              locale === "en" ? russo.className : changa.className
            } font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-400 text-3xl md:text-4xl`}
          >
            {t("blueteam.title")}
          </h1>
        </div>
        <div className="mt-8 flex justify-center">
          <h2 className="text-center">{t("blueteam.description")}</h2>
        </div>
        <br />
        <div className="flex justify-center">
          <h2 className="text-center">{t("blueteam.description2")}</h2>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            as={Link}
            href="https://github.com/abuj4m4l/hassanah"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
            >
              <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
            </svg>
            GitHub
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
