"use client";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  ChakraProvider,
  MenuList,
  MenuItem,
  MenuButton,
  Menu
} from '@chakra-ui/react';
import theme from '../../commonTheme';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTranslations } from 'next-intl';

const Navbar = ({ locale }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const t = useTranslations('navbar');
  return (
    <>
      <header>
        <nav className="select-none justify-between w-full bg-primary flex items-center">
          <ul className="flex sm:hidden">
            <li className="ltr:ml-[10px] rtl:mr-[10px]">
              <FontAwesomeIcon ref={btnRef} onClick={onOpen} icon={faBars} style={{ color: "white", width: '20px' }} className="cursor-pointer" />
            </li>
          </ul>
          <ul className="sm:hidden flex w-screen justify-center items-center h-[50px]">
            <li className="flex justify-center items-center">
              <h3>Hassanah.org</h3>
            </li>
          </ul>
          <ul className="hidden sm:flex">
            <li className="ltr:ml-[10px] rtl:mr-[10px]">
              <FontAwesomeIcon ref={btnRef} onClick={onOpen} icon={faBars} style={{ color: "white", width: '20px' }} className="cursor-pointer lg:hidden" />
            </li>
          </ul>
          <div className="hidden sm:flex flex-row">
            <button className="btn bg-white hover:bg-transparent border-2 border-white text-black hover:text-white">
              <Link href="/login" className="text-xs">
                {t('login')}
              </Link>
            </button>
            <div className="flex items-center flex-row-reverse">
              <Link href="/" className="ml-[10px] text-xs">
                {t('home')}
              </Link>
              <ChakraProvider theme={theme}>
                <Menu>
                  <MenuButton style={{ fontSize: "12px" }} className='ml-[10px]'>{t('quran')}</MenuButton>
                  <MenuList>
                    <MenuItem><Link href="/quran" className="text-sm">{t('quran')}</Link></MenuItem>
                    <MenuItem><Link href="/rectiers" className="text-sm">{t('rectiers')}</Link></MenuItem>
                  </MenuList>
                </Menu>
              </ChakraProvider>
              <Link href="/stories" className="ml-[10px] text-xs">
                {t('stories')}
              </Link>
              <Link href="/hadiths" className="mx-[10px] text-xs">
                {t('hadiths')}
              </Link>
            </div>
          </div>
          <ul className="hidden sm:flex sm:ltr:mr-[20px] sm:rtl:ml-[20px] sm:items-center sm:h-[50px]">
            <li className="sm:flex sm:justify-end sm:items-center">
              <h3>Hassanah.org</h3>
            </li>
          </ul>
        </nav>
      </header>
      <aside>
        {
          locale === "ar" ? (
            <>
              <ChakraProvider theme={theme}>
                <Drawer
                  isOpen={isOpen}
                  placement='right'
                  onClose={onClose}
                  finalFocusRef={btnRef}
                  size={'xs'}
                >
                  <DrawerOverlay />
                  <DrawerContent
                    dir='ltr'>
                    <DrawerCloseButton />
                    <br />
                    <br />
                    <DrawerBody className='select-none'>
                      <Link href="/login" className="text-sm">{t('login')}</Link>
                      <br />
                      <br />
                      <Link href="/" className="text-sm">{t('home')}</Link>
                      <br />
                      <br />
                      <Menu>
                        <MenuButton>{t('quran')}</MenuButton>
                        <MenuList>
                          <MenuItem><Link href="/quran" className="text-sm">{t('quran')}</Link></MenuItem>
                          <MenuItem><Link href="/rectiers" className="text-sm">{t('rectiers')}</Link></MenuItem>
                        </MenuList>
                      </Menu>
                      <br />
                      <br />
                      <Link href="/stories" className="text-sm">{t('stories')}</Link>
                      <br />
                      <br />
                      <Link href="/hadiths" className="text-sm">{t('hadiths')}</Link>
                      <br />
                      <br />
                      <br />
                      <div className="items-center justify-center space-x-5 flex flex-row">
                        <Link href="https://example.com"><FontAwesomeIcon icon={faFacebook} size="xl" /></Link>
                        <Link href="https://example.com"><FontAwesomeIcon icon={faInstagram} size="xl" /></Link>
                        <Link href="https://example.com"><FontAwesomeIcon icon={faXTwitter} size="xl" /></Link>
                      </div>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </ChakraProvider>
            </>
          ) : (
            <>
              <ChakraProvider theme={theme}>
                <Drawer
                  isOpen={isOpen}
                  placement='left'
                  onClose={onClose}
                  finalFocusRef={btnRef}
                  size={'xs'}
                >
                  <DrawerOverlay />
                  <DrawerContent
                    dir='ltr'>
                    <DrawerCloseButton />
                    <br />
                    <br />
                    <DrawerBody className='select-none'>
                      <Link href="/login" className="text-sm">{t('login')}</Link>
                      <br />
                      <br />
                      <Link href="/" className="text-sm">{t('home')}</Link>
                      <br />
                      <br />
                      <Menu>
                        <MenuButton>{t('quran')}</MenuButton>
                        <MenuList>
                          <MenuItem><Link href="/quran" className="text-sm">{t('quran')}</Link></MenuItem>
                          <MenuItem><Link href="/rectiers" className="text-sm">{t('rectiers')}</Link></MenuItem>
                        </MenuList>
                      </Menu>
                      <br />
                      <br />
                      <Link href="/stories" className="text-sm">{t('stories')}</Link>
                      <br />
                      <br />
                      <Link href="/hadiths" className="text-sm">{t('hadiths')}</Link>
                      <br />
                      <br />
                      <br />
                      <div className="items-center justify-center space-x-5 flex flex-row">
                        <Link href="https://example.com"><FontAwesomeIcon icon={faFacebook} size="xl" /></Link>
                        <Link href="https://example.com"><FontAwesomeIcon icon={faInstagram} size="xl" /></Link>
                        <Link href="https://example.com"><FontAwesomeIcon icon={faXTwitter} size="xl" /></Link>
                      </div>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </ChakraProvider>
            </>
          )
        }
      </aside>
    </>
  );
};

export default Navbar;