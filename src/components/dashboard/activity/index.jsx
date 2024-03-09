"use client";

import Image from "next/image";
import '../../../../public/css/activity.css'
import { useTranslations } from "next-intl";
import { Button, ChakraProvider, Menu, MenuButton, MenuItem, MenuList, Select } from "@chakra-ui/react";
import theme from '../../../commonTheme'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const Activity = () => {
    const t = useTranslations('activity');
    return (
        <section role="tab">
            <div className="">
                <ChakraProvider theme={theme}>
                    <Menu>
                        <MenuButton bgColor="#343434" _active={{ bgColor: "#242424" }} _focus={{ bgColor: "#242424" }} _hover={{ bgColor: "#242424" }} textColor="white" as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                            {t('filter')}
                        </MenuButton>
                        <MenuList>
                            <MenuItem>{t('viewed')}</MenuItem>
                            <MenuItem>{t('listened')}</MenuItem>
                            <MenuItem>{t('playlists')}</MenuItem>
                        </MenuList>
                    </Menu>
                </ChakraProvider>
            </div>
        </section>
    )
}

export default Activity;