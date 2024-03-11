"use client";

import { Navbar as NextUiNavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input'
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from '@nextui-org/dropdown'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SearchIcon from '../../icons/searchIcon';
import { auth } from '../../../firebase';

const Navbar = ({ locale }) => {
  const t = useTranslations('navbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header>
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
              <NavbarItem className='hidden sm:block'>
                <Link color="foreground" href="/">
                  {t('home')}
                </Link>
              </NavbarItem>
              <NavbarItem className='hidden sm:block'>
                <Link href="/stories" color="foreground">
                  {t('stories')}
                </Link>
              </NavbarItem>
              <NavbarItem className='hidden sm:block'>
                <Link color="foreground" href="/hadiths">
                  {t('hadiths')}
                </Link>
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
                  >
                    <DropdownItem
                      key="quran"
                    >
                      <Link href='/quran' color='foreground'>{t('quran')}</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link key="reciters" href='/reciters' color='foreground'>
                        {t('reciters')}
                      </Link>
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
              startContent={<SearchIcon width={18} height={18} className="text-white" />}
              type="search"
            />
            {
              auth?.currentUser?(<>
              <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={auth?.currentUser?.displayName}
                  size="sm"
                  src={auth?.currentUser?.photoURL}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{t('signedin_as')}</p>
                  <p className="font-semibold">{auth?.currentUser?.displayName}</p>
                </DropdownItem>
                <DropdownItem key="settings"> <Link key="reciters" href='/dashboard' color='foreground'>{t('dashboard')}</Link></DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={() => Signout()}>
                  <Link key="reciters" href='/logout' color='foreground'>{t('signout')}</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </>):(
              <>
              <Button variant='flat' color='primary'><Link href='/login'>{t('login')}</Link></Button>
              </>
            )
            }
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
                startContent={<SearchIcon width={18} height={18} className="text-white" />}
                type="search"
              />
            </NavbarMenuItem>
            <NavbarMenuItem className='mt-4'>
              <Link
                className="w-full"
                href="/"
                size="lg"
                color="foreground"
              >
                {t('home')}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full"
                href="/hadiths"
                size="lg"
                color="foreground"
              >
                {t('hadiths')}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full"
                href="/quran"
                size="lg"
                color="foreground"
              >
                {t('quran')}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full"
                href="/stories"
                size="lg"
                color="foreground"
              >
                {t('stories')}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full"
                href="/logout"
                size="lg"
                color='danger'
              >
                {t('signout')}
              </Link>
            </NavbarMenuItem>
          </NavbarMenu>
        </NextUiNavbar>
      </header >
    </>
  );
};

export default Navbar;