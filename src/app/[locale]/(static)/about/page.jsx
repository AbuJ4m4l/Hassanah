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
      <section className="bg-primary w-full h-[500px]">
        <div>
          <div className="w-[280px]">
            <h1
              className={`text-5xl ${
                locale === "en" ? russo.className : changa.className
              }`}
            >
              {t("heroSection.heading")}
            </h1>
            <p className="mt-4">{t("heroSection.text")}</p>
          </div>
          <Image
            as={nextImage}
            width={300}
            height={300}
            alt="Connected"
            loading="lazy"
            src="/images/svg/connected"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
