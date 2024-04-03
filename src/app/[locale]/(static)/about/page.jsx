"use client";

import { Button, Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Changa, Russo_One } from "next/font/google";
import nextImage from "next/image";
const russo = Russo_One({ weight: ["400"], subsets: ["latin"] });
const changa = Changa({ weight: ["600"], subsets: ["arabic"] });

const AboutPage = ({ params: { locale } }) => {
  const t = useTranslations("aboutUs");

  return (
    <div className="container !-mt-8">
      <section className="bg-primary px-10 py-8 xl:px-[300px] lg:py-16 w-full h-auto">
        <div className="flex flex-col md:flex-row">
          <div className="w-[280px]">
            <h1
              className={`text-5xl 2xl:text-7xl ${
                locale === "en" ? russo.className : changa.className
              }`}
            >
              {t("heroSection.heading")}
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
              className="md:rtl:mr-28 md:ltr:ml-28 mt-9"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
