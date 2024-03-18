import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "/navigation";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "ar",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
