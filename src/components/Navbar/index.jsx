"use client";

import { Navbar as NextUiNavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input'
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import LoginButton from "../authentication/loginButton";

const Navbar = ({ locale }) => {
  const t = useTranslations('navbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <NextUiNavbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent justify="start">
          <NavbarMenuToggle className='md:hidden' aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          <NavbarBrand className="mr-4">
            <p className="font-bold text-inherit">Hassanah.org</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3">
            <NavbarItem as={Link} href="/" color="foreground" className='hidden sm:block'>
              {t('home')}
            </NavbarItem>
            <NavbarItem as={Link} href="/stories" color="foreground" className='hidden sm:block'>
              {t('stories')}
            </NavbarItem>
            <NavbarItem as={Link} href="/hadiths" color="foreground" className='hidden sm:block'>
              {t('hadiths')}
            </NavbarItem>
            <NavbarItem className='hidden sm:block'>
              <Dropdown>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                      radius="sm"
                      variant="light"
                    >
                      {t('quran')}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label={t('quran')}
                  className="w-[340px]"
                  itemClasses={{
                    base: "gap-4",
                  }}
                  as={Link}
                  href="/quran"
                  color="foreground"
                >
                  <DropdownItem
                    key="quran"
                  >
                    {t('quran')}
                  </DropdownItem>
                  <DropdownItem as={Link} href="/reciters" color="foreground">
                    {t('reciters')}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            className='hidden md:block'
            placeholder={t('type_to_search')}
            size="sm"
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            }
            type="search"
          />
          <LoginButton AvatarClassName="mt-4" variant="flat" />
        </NavbarContent>


        <NavbarMenu>
          <NavbarMenuItem>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              className='block'
              placeholder={t('type_to_search')}
              size="sm"
              startContent={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              }
              type="search"
            />
          </NavbarMenuItem>
          <NavbarMenuItem className="mt-4">
            <LoginButton variant="flat" />
          </NavbarMenuItem>
          <NavbarMenuItem as={Link} href="/" color="foreground" className='mt-4 text-medium'>
            {t('home')}
          </NavbarMenuItem>
          <NavbarMenuItem as={Link} href="/hadiths" color="foreground" className="text-medium">
            {t('hadiths')}
          </NavbarMenuItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-medium"
                  radius="sm"
                  variant="light"
                >
                  {t('quran')}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label={t('quran')}
              className="w-[280px]"
              itemClasses={{
                base: "gap-4",
              }}
              as={Link}
              href="/quran"
              color="foreground"
            >
              <DropdownItem
                key="quran"
              >
                {t('quran')}
              </DropdownItem>
              <DropdownItem as={Link} href="/reciters" color="default">
                {t('reciters')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarMenuItem as={Link} href="/stories" color="default" className="text-medium">
            {t('stories')}
          </NavbarMenuItem>
        </NavbarMenu>
      </NextUiNavbar>
    </>
  );
};

export default Navbar;