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
import theme from "../../commonTheme"
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

const Sidebar_ar = ({ isOpen, onClose }) => {
    const btnRef = useRef();
    const t = useTranslations('navbar');
    return (
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
                            <Link href="/login">{t('login')}</Link>
                            <br />
                            <br />
                            <Link href="/">{t('home')}</Link>
                            <br />
                            <br />
                            <Menu>
                                <MenuButton>{t('quran')}</MenuButton>
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

export default Sidebar_ar;