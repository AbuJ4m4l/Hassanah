"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../languageSwitcher";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Footer = ({ locale }) => {
  const pathname = usePathname();
  const t = useTranslations("footer");
  const [path, setPath] = useState("");
  useEffect(() => {
    let path = pathname.split(locale === "ar" ? "/ar/" : "/en/");
    setPath(path[1]);
  }, [pathname, locale]);
  return (
    <footer className="border-t border-divider select-none backdrop-blur-lg backdrop-saturate-150 bg-background/70 w-full h-[650px] md:h-[400px]">
      <div className="flex flex-row">
        <Image
          src="/images/hassanahLoggo-white.png"
          alt="Hassanah Logo"
          width={60}
          height={60}
          className="m-7 rounded-full"
          loading="lazy"
        ></Image>
        <h2 className="mt-11 text-primary">{t("hassanah")}</h2>
      </div>
      <hr className="w-[95%] m-[2.5%] my-4 border-primary lg:w-[70%] lg:mx-[15%]" />
      <div className="md:hidden flex-row justify-center flex my-[10px]">
        <Link href="https://example.com" className="mx-3">
          <svg
            stroke="white"
            fill="white"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
          </svg>
        </Link>
        <Link href="https://example.com" className="mx-3">
          <svg
            stroke="white"
            fill="white"
            strokeWidth="0"
            role="img"
            viewBox="0 0 24 24"
            height="32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
          </svg>
        </Link>
        <Link href="https://example.com" className="mx-3">
          <svg
            stroke="white"
            fill="white"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
          </svg>
        </Link>
      </div>
      <div className="md:hidden flex justify-center mt-6">
        <LanguageSwitcher variant="flat" location={pathname} />
      </div>
      <div className="flex flex-row space-x-3 px-3 justify-evenly my-[10px] lg:w-[800px] lg:mx-[10%] 2xl:mx-[15%]">
        <div className="md:block hidden">
          <h3 className="text-primary text-lg">{t("helpfull_links")}</h3>
          <ul className="space-y-3 mt-4">
            <li className="text-xs">
              <Link href="/">{t("home")}</Link>
            </li>
            <li className="text-xs">
              <Link href="/quran">{t("quran")}</Link>
            </li>
            <li className="text-xs">
              <Link href="/stories">{t("stories")}</Link>
            </li>
            <li className="text-xs">
              <Link href="/hadthis">{t("hadiths")}</Link>
            </li>
          </ul>
        </div>
        <div className="md:block hidden">
          <h3 className="text-primary text-lg">{t("company")}</h3>
          <ul className="space-y-3 mt-4">
            <li className="text-xs">
              <Link href="/about">{t("about_hasana")}</Link>
            </li>
            <li className="text-xs">
              <Link href="/about-blueteam">{t("about_blueteam")}</Link>
            </li>
            <li className="text-xs">
              <Link href="/news">{t("news")}</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <h3 className="text-primary text-lg">{t("support_center")}</h3>
          <ul className="space-y-3 mt-4">
            <li className="text-xs">
              <Link href="/support-center?request=problem">
                {t("i_have_problem")}
              </Link>
            </li>
            <li className="text-xs">
              <Link href="/support-center?request=question">
                {t("i_have_question")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <h3 className="text-primary text-lg">{t("policies")}</h3>
          <ul className="space-y-3 mt-4">
            <li className="text-xs">
              <Link href="/terms">{t("terms_of_use")}</Link>
            </li>
            <li className="text-xs">
              <Link href="/privacy">{t("privacy_policy")}</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="hidden md:flex md:flex-row">
            <Link href="https://example.com" className="mx-3">
              <svg
                stroke="white"
                fill="white"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
              </svg>
            </Link>
            <Link href="https://example.com" className="mx-3">
              <svg
                stroke="white"
                fill="white"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </Link>
            <Link href="https://example.com" className="mx-3">
              <svg
                stroke="white"
                fill="white"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </Link>
          </div>
          <div className="md:block hidden mt-6">
            <LanguageSwitcher color="default" variant="flat" location={path} />
          </div>
        </div>
      </div>
      <div className="px-3 space-x-5 md:hidden flex justify-evenly my-[10px]">
        <div className="space-y-5">
          <div className="block md:hidden">
            <h3 className="text-primary text-lg">{t("helpfull_links")}</h3>
            <ul className="space-y-3 mt-4">
              <li className="text-xs">
                <Link href="/">{t("home")}</Link>
              </li>
              <li className="text-xs">
                <Link href="/quran">{t("quran")}</Link>
              </li>
              <li className="text-xs">
                <Link href="/stories">{t("stories")}</Link>
              </li>
              <li className="text-xs">
                <Link href="/hadthis">{t("hadiths")}</Link>
              </li>
            </ul>
          </div>
          <div className="block md:hidden">
            <h3 className="text-primary text-lg">{t("company")}</h3>
            <ul className="space-y-3 mt-4">
              <li className="text-xs">
                <Link href="/about">{t("about_hasana")}</Link>
              </li>
              <li className="text-xs">
                <Link href="/about-blueteam">{t("about_blueteam")}</Link>
              </li>
              <li className="text-xs">
                <Link href="/news">{t("news")}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-20">
          <div>
            <h3 className="text-primary text-lg">{t("support_center")}</h3>
            <ul className="space-y-3 mt-4">
              <li className="text-xs">{t("i_have_problem")}</li>
              <li className="text-xs">{t("i_have_question")}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary text-lg">{t("policies")}</h3>
            <ul className="space-y-3 mt-4">
              <li className="text-xs">
                <Link href="/terms">{t("terms_of_use")}</Link>
              </li>
              <li className="text-xs">
                <Link href="/privacy">{t("privacy_policy")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="w-[95%] m-[2.5%] my-4 border-primary lg:w-[70%] lg:mx-[15%]" />
      <div className="flex justify-center">
        <p className="text-xs">{t("copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
