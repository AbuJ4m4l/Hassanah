"use client";
import {
  ChakraProvider,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
  useDisclosure
} from '@chakra-ui/react';
import theme from '../../../commonTheme';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import Sidebar_ar from '../Sidebar/ar';
import Sidebar_en from '../Sidebar/en';
import { useRef } from 'react';
import Login from '../Login';

const Navbar = ({ locale }) => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Login AvtrSize="sm" />
            <div className="flex items-center flex-row-reverse text-sm">
              <Link href="/" className="ml-[10px]">
                {t('home')}
              </Link>
              <ChakraProvider theme={theme}>
                <Menu>
                  <MenuButton className='ml-[10px]'>{t('quran')}</MenuButton>
                  <MenuList>
                    <MenuItem><Link href="/quran">{t('quran')}</Link></MenuItem>
                    <MenuItem><Link href="/reciters">{t('reciters')}</Link></MenuItem>
                  </MenuList>
                </Menu>
              </ChakraProvider>
              <Link href="/stories" className="ml-[10px]">
                {t('stories')}
              </Link>
              <Link href="/hadiths" className="mx-[10px]">
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
      </header >
      <aside>
        {
          locale === "ar" ? (
            <Sidebar_ar isOpen={isOpen} onClose={onClose} />
          ) : (
            <Sidebar_en isOpen={isOpen} onClose={onClose} />
          )
        }
      </aside>
    </>
  );
};

export default Navbar;