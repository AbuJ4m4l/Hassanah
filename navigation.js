import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "ar"];
export const localePrefix = "";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
