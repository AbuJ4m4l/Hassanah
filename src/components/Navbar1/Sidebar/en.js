"use client"
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
    Menu,
    Button
} from '@chakra-ui/react';
import theme from "../../../commonTheme"
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import Login from '../Login';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Sidebar_en = ({ isOpen, onClose }) => {
    const btnRef = useRef();
    const t = useTranslations('navbar');
    return (
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
                            <Login AvtrSize="md" />
                            <br />
                            <br />
                            <Link href="/">{t('home')}</Link>
                            <br />
                            <br />
                            <Menu>
                                <MenuButton fontWeight="400" className="-ml-[18px]" bgColor="#343434" _active={{ bgColor: "#242424" }} _focus={{ bgColor: "#242424" }} _hover={{ bgColor: "#242424" }} textColor="white" as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>{t('quran')}</MenuButton>
                                <MenuList>
                                    <MenuItem><Link href="/quran">{t('quran')}</Link></MenuItem>
                                    <MenuItem><Link href="/reciters">{t('reciters')}</Link></MenuItem>
                                </MenuList>
                            </Menu>
                            <br />
                            <br />
                            <Link href="/stories">{t('stories')}</Link>
                            <br />
                            <br />
                            <Link href="/hadiths">{t('hadiths')}</Link>
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

export default Sidebar_en;