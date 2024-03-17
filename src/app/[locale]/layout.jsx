import { Changa, Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import { locales } from "../../../navigation";
import { notFound } from "next/navigation";
import NextUiProvider from "../../components/Providers/NextUiProvider.jsx";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from 'next-intl/server'
import BodyTheme from "../../components/BodyTheme/index.jsx";
const changa = Changa({ subsets: ["arabic"] });
const jetbrains_mono = Noto_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
    title: "حسنة",
    description: "موقع حسنة للأمور دينية",
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
                    <link rel="icon" type="image/x-icon" href="/images/favicon/withBackground/favicon.ico" />
                    <link rel="apple-touch-icon" href="/images/favicon/withBackground/favicon.ico" />
                    <meta name="description" content="Hassanah.org: Your premier source for Quran Kareem readings, Islamic stories, Hadith collections, accurate prayer times, and more. Join our community to explore the richness of Islamic teachings in English and Arabic. Follow us on Facebook, X, and Instagram." />
                    <meta name="keywords" content="Quran Kareem, Islamic Stories, Hadith, Prayer Times, Islamic Education, Spiritual Growth, Multilingual Islamic Content, Quran Listening, Islamic Community, Hassanah" />
                    <meta property="og:title" content="Hassanah - Explore the Essence of Islamic Teachings" />
                    <meta property="og:description" content="Discover Quran readings, Islamic stories, Hadiths, and accurate prayer times. Dive into Islamic teachings in both English and Arabic with Hassanah.org." />
                    <meta property="og:url" content="https://hassanah.org" />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content="https://hassanah.org/favicon.ico" />
                    <meta name="twitter:title" content="Hassanah - Your Gateway to Islamic Wisdom" />
                    <meta name="twitter:description" content="Engage with the Quran Kareem, Islamic stories, and Hadiths. Follow accurate prayer times and join our community for spiritual growth and learning." />
                    <meta name="twitter:image" content="https://hassanah.org/favicon.ico" />
                    <meta name="twitter:card" content="summary_large_image" />

                    <meta name="description" content="حسنة.أورج: مصدرك الأول لقراءات القرآن الكريم، القصص الإسلامية، مجموعات الحديث، أوقات الصلاة الدقيقة، والمزيد. انضم إلى مجتمعنا لاستكشاف غنى التعاليم الإسلامية باللغتين الإنجليزية والعربية. تابعنا على فيسبوك، اكس، وانستغرام." />
                    <meta name="keywords" content="القرآن الكريم, القصص الإسلامية, الحديث, أوقات الصلاة, التعليم الإسلامي, النمو الروحي, المحتوى الإسلامي متعدد اللغات, الاستماع للقرآن, المجتمع الإسلامي, حسنة" />
                    <meta property="og:title" content="حسنة - استكشف جوهر التعاليم الإسلامية" />
                    <meta property="og:description" content="اكتشف قراءات القرآن، القصص الإسلامية، الأحاديث، وأوقات الصلاة الدقيقة. غص في التعاليم الإسلامية باللغتين الإنجليزية والعربية مع حسنة.أورج." />
                    <meta property="og:url" content="https://hassanah.org" />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content="https:/hassana.org/favicon.ico" />
                    <meta name="twitter:title" content="حسنة - بوابتك إلى حكمة الإسلام" />
                    <meta name="twitter:description" content="تفاعل مع القرآن الكريم، القصص الإسلامية، والأحاديث. اتبع أوقات الصلاة الدقيقة وانضم إلى مجتمعنا للنمو الروحي والتعلم." />
                    <meta name="twitter:image" content="[صورة URL]" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

                </head>
                <BodyTheme dir={direction} className={`overflow-x-hidden selection:bg-primary m-0 p-0 selection:text-white ${locale === "ar" ? changa.className : jetbrains_mono.className} flex flex-col min-h-screen`}>
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <NextUiProvider>
                            <Navbar locale={locale} />
                            <div className="container">
                                <main className="content mb-[60px] mt-[40px] flex-1">
                                    <div aria-hidden="true" className="select-none fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"><img src="/gradients/docs-right.png" className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" alt="right background" data-loaded="true" /></div>
                                    <div aria-hidden="true" className="select-none fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0"><img src="/gradients/docs-left.png" className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" alt="left background" data-loaded="true" /></div>
                                    {children}
                                </main>
                                <Footer locale={locale} />
                            </div>
                        </NextUiProvider>
                    </NextIntlClientProvider>
                </BodyTheme>
            </html>
        );
    }
}