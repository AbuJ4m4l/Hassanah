"use client";
import Image from "next/image";
import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LoginButton from "../authentication/loginButton";
import { Kbd } from "@nextui-org/react";

const Navbar = () => {
  const t = useTranslations("navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <NextUiNavbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            className="lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand className="mr-4">
            <Image
              src="/images/لا اله الا الله White.png"
              width={80}
              height={38}
              alt="لا اله الا الله"
              loading="lazy"
              className="dark:block hidden !min-w-[88px] !min-h-[46px]"
            />
            <Image
              src="/images/لا اله الا الله Black.png"
              width={80}
              height={38}
              alt="لا اله الا الله"
              loading="lazy"
              className="dark:hidden block !min-w-[88px] !min-h-[46px]"
            />
          </NavbarBrand>
          <NavbarContent className="hidden lg:flex gap-3">
            <li>
              <NavbarItem
                as={Link}
                href="/"
                color="foreground"
                className="hidden lg:block"
              >
                {t("home")}
              </NavbarItem>
            </li>
            <li>
              <NavbarItem
                as={Link}
                href="/stories"
                color="foreground"
                className="hidden lg:block"
              >
                {t("stories")}
              </NavbarItem>
            </li>
            <li>
              <NavbarItem
                as={Link}
                href="/hadiths"
                color="foreground"
                className="hidden lg:block"
              >
                {t("hadiths")}
              </NavbarItem>
            </li>
            <li>
              <NavbarItem
                as={Link}
                href="/quran"
                color="foreground"
                className="hidden lg:block"
              >
                {t("quran")}
              </NavbarItem>
            </li>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full lg:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            className="hidden lg:block"
            placeholder={t("type_to_search")}
            size="sm"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            }
            endContent={<Kbd keys={["command"]}>K</Kbd>}
            type="search"
            isReadOnly
          />
          <LoginButton AvatarClassName="mt-4" variant="flat" />
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <Input
              classNames={{
                base: "max-w-full lg:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              className="block"
              placeholder={t("type_to_search")}
              size="sm"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              }
              type="search"
            />
          </NavbarMenuItem>
          <NavbarMenuItem className="mt-4">
            <LoginButton variant="flat" />
          </NavbarMenuItem>
          <NavbarMenuItem
            as={Link}
            href="/"
            color="foreground"
            className="mt-4 text-medium"
          >
            {t("home")}
          </NavbarMenuItem>
          <NavbarMenuItem
            as={Link}
            href="/hadiths"
            color="foreground"
            className="text-medium"
          >
            {t("hadiths")}
          </NavbarMenuItem>
          <NavbarMenuItem
            as={Link}
            className="text-medium"
            href="/quran"
            color="foreground"
          >
            {t("quran")}
          </NavbarMenuItem>
          <NavbarMenuItem
            as={Link}
            href="/stories"
            color="default"
            className="text-medium"
          >
            {t("stories")}
          </NavbarMenuItem>
        </NavbarMenu>
      </NextUiNavbar>
    </>
  );
};

export default Navbar;
