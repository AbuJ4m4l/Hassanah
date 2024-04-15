"use client";

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
            className="md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand className="mr-4">
            <p className="font-bold text-inherit">Hassanah.org</p>
          </NavbarBrand>
          <NavbarContent className="hidden md:flex gap-3">
            <li>
              <NavbarItem
                as={Link}
                href="/"
                color="foreground"
                className="hidden md:block"
              >
                {t("home")}
              </NavbarItem>
            </li>
            <li>
              <NavbarItem
                as={Link}
                href="/stories"
                color="foreground"
                className="hidden md:block"
              >
                {t("stories")}
              </NavbarItem>
            </li>
            <li>
              <NavbarItem
                as={Link}
                href="/hadiths"
                color="foreground"
                className="hidden md:block"
              >
                {t("hadiths")}
              </NavbarItem>
            </li>
            <li>
              <NavbarItem
                as={Link}
                href="/quran"
                color="foreground"
                className="hidden md:block"
              >
                {t("quran")}
              </NavbarItem>
            </li>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full md:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            className="hidden md:block"
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
                base: "max-w-full md:max-w-[10rem] h-10",
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
            href="/quran"
            color="foreground"
            className="hidden md:block"
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
