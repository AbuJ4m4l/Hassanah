"use client";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    ChakraProvider,
} from '@chakra-ui/react'
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import theme from '../../commonTheme';
import { useTranslations } from 'next-intl';
import web from '../../../package.json'

const LanguageSwitcher = ({ location }) => {
    const t = useTranslations('activity');
    const WebsiteVersion = web?.version;
    return (
        <ChakraProvider theme={theme}>
            <div className='ltr:float-left rtl:float-right'>
                <h1>{t('language')}:</h1>
                <br />
                <Menu direction='ltr'>
                    <MenuButton fontWeight="400" bgColor="#343434" _active={{ bgColor: "#242424" }} _focus={{ bgColor: "#242424" }} _hover={{ bgColor: "#242424" }} textColor="white" as={Button} rightIcon={<FontAwesomeIcon icon={faGlobe} />}>
                        Language
                    </MenuButton>
                    <MenuList>
                        <Link href={`/ar/${location}`}><MenuItem className='flex flex-row'><Image src="/images/flags/ksa.png" width={25} height={25} loading='lazy' alt='Flag' className='rounded-sm rtl:ml-2 ltr:mr-2' />Arabic</MenuItem></Link>
                        <Link href={`/en/${location}`}><MenuItem className='flex flex-row'><Image src="/images/flags/usa.png" width={25} height={25} loading='lazy' alt='Flag' className='rounded-sm rtl:ml-2 ltr:mr-2' />English</MenuItem></Link>
                    </MenuList>
                </Menu>
                <br />
                <br />
                <p>{t('website_version')}: {WebsiteVersion} v</p>
            </div>
        </ChakraProvider>
    )
}

export default LanguageSwitcher;