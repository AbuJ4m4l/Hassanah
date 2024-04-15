import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import { locales } from "../../../navigation.js";
import { notFound } from "next/navigation";
import NextUiProvider from "../../components/Providers/NextUiProvider.jsx";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import BodyTheme from "../../components/BodyTheme/index.jsx";
import Middleware from "../../components/Middleware/index.jsx";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Hassanah - Explore the Essence of Islamic Teachings",
  description:
    "Hassanah.org: Your premier source for Quran Kareem readings, Islamic stories, Hadith collections, accurate prayer times, and more. Join our community to explore the richness of Islamic teachings in English and Arabic. Follow us on Facebook, X, and Instagram.",
  keywords:
    "Quran Kareem, Islamic Stories, Hadith, Prayer Times, Islamic Education, Spiritual Growth, Multilingual Islamic Content, Quran Listening, Islamic Community, Hassanah",
  openGraph: {
    title: "Hassanah - Explore the Essence of Islamic Teachings",
    description:
      "Discover Quran readings, Islamic stories, Hadiths, and accurate prayer times. Dive into Islamic teachings in both English and Arabic with Hassanah.org.",
    url: "https://hassanah.org",
    type: "website",
    images: [
      {
        url: "https://hassanah.org/favicon.ico",
      },
    ],
  },
  twitter: {
    title: "Hassanah - Your Gateway to Islamic Wisdom",
    description:
      "Engage with the Quran Kareem, Islamic stories, and Hadiths. Follow accurate prayer times and join our community for spiritual growth and learning.",
    images: [
      {
        url: "https://hassanah.org/favicon.ico",
      },
    ],
    card: "summary_large_image",
  },
  other: {
    title: "حسنة - استكشف جوهر التعاليم الإسلامية",
    description:
      "حسنة.أورج: مصدرك الأول لقراءات القرآن الكريم، القصص الإسلامية، مجموعات الحديث، أوقات الصلاة الدقيقة، والمزيد. انضم إلى مجتمعنا لاستكشاف غنى التعاليم الإسلامية باللغتين الإنجليزية والعربية. تابعنا على فيسبوك، اكس، وانستغرام.",
    keywords:
      "القرآن الكريم, القصص الإسلامية, الحديث, أوقات الصلاة, التعليم الإسلامي, النمو الروحي, المحتوى الإسلامي متعدد اللغات, الاستماع للقرآن, المجتمع الإسلامي, حسنة",
    openGraph: {
      title: "حسنة - استكشف جوهر التعاليم الإسلامية",
      description:
        "اكتشف قراءات القرآن، القصص الإسلامية، الأحاديث، وأوقات الصلاة الدقيقة. غص في التعاليم الإسلامية باللغتين الإنجليزية والعربية مع حسنة.أورج.",
      url: "https://hassanah.org",
      type: "website",
      images: [
        {
          url: "https://hassana.org/favicon.ico",
        },
      ],
    },
    twitter: {
      title: "حسنة - بوابتك إلى حكمة الإسلام",
      description:
        "تفاعل مع القرآن الكريم، القصص الإسلامية، والأحاديث. اتبع أوقات الصلاة الدقيقة وانضم إلى مجتمعنا للنمو الروحي والتعلم.",
      images: [
        {
          url: "[صورة URL]",
        },
      ],
      card: "summary_large_image",
    },
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  charSet: "UTF-8",
};

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  if (!locales.includes(locale)) {
    notFound();
  } else {
    const direction = locale === "ar" ? "rtl" : "ltr";
    return (
      <html lang={locale}>
        <head>
          <link
            rel="icon"
            type="image/x-icon"
            href="/images/favicon/circled/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            href="/images/favicon/circled/favicon.ico"
          />
        </head>
        <BodyTheme
          dir={direction}
          className={`text-foreground bg-background overflow-x-hidden selection:bg-primary m-0 p-0 selection:text-white flex flex-col min-h-screen`}
        >
          <Middleware>
            <NextTopLoader
              color="#0093FD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            <NextIntlClientProvider messages={messages} locale={locale}>
              <NextUiProvider>
                <Navbar locale={locale} />
                <div className="container">
                  <main className="content mb-[60px] mt-[40px] flex-1">
                    {children}
                  </main>
                  <Footer locale={locale} />
                </div>
              </NextUiProvider>
            </NextIntlClientProvider>
          </Middleware>
        </BodyTheme>
      </html>
    );
  }
}
