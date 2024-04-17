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
