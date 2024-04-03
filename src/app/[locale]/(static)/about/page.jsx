"use client";

import { Button, Image } from "@nextui-org/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Changa, Russo_One } from "next/font/google";
import nextImage from "next/image";
import { useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

export const russo = Russo_One({ weight: ["400"], subsets: ["latin"] });
export const changa = Changa({ weight: ["600"], subsets: ["arabic"] });

const AboutPage = ({ params: { locale } }) => {
  const t = useTranslations("aboutUs");
  /*useEffect(() => {
    gsap.to(".heroSection-items", {
      x: 0,
      duration: 3,
      scrollTrigger: {
        trigger: ".heroSection-items",
        markers: true,
        start: "top center",
        end: "bottom 80px",
        scrub: true,
      },
    });
  }, []);*/
  return (
    <div className="container !-mt-9 space-y-14">
      <section className="bg-black/70 backdrop-blur-3xl px-10 py-8 md:px-[70px] lg:px-[200px] xl:px-[300px] 2xl:px-[600px] lg:py-16 w-full h-auto">
        <div className="flex flex-col md:flex-row">
          <div className="w-[280px]">
            <h1
              className={`bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-400 text-4xl sm:text-5xl ${
                locale === "en" ? russo.className : changa.className
              }`}
            >
              <Typewriter
                words={[t("heroSection.heading")]}
                cursorColor="#60a5fa"
                cursorStyle="_"
                cursor={true}
              />
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
      <section>
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold">{t("header")}</h1>
        </div>
        <div classname="flex flex-col md:flex-row w-[360px]">
          <div className="w-[280px]">
            <h2 className="text-center">{t("intro")}</h2>
          </div>
          <div>
            <Image
              as={nextImage}
              width={300}
              height={300}
              alt="Website Builder"
              loading="lazy"
              src="/images/svg/website_builder.svg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
