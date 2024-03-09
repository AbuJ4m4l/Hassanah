"use client";

import { Button, ChakraProvider, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme from '../../../commonTheme'
import { useTranslations } from "next-intl";

const Filter = ({ dir }) => {
    const t = useTranslations('activity')
    return (
        <>
            {
                dir === "rtl" ? (
                    <>
                        <ChakraProvider theme={theme}>
                            <Menu>
                                <MenuButton bgColor="#343434" _active={{ bgColor: "#242424" }} _focus={{ bgColor: "#242424" }} _hover={{ bgColor: "#242424" }} textColor="white" as={Button} leftIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                                    {t('filter')}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>{t('viewed')}</MenuItem>
                                    <MenuItem>{t('listened')}</MenuItem>
                                    <MenuItem>{t('playlists')}</MenuItem>
                                </MenuList>
                            </Menu>
                        </ChakraProvider>
                    </>
                ) : (
                    <>
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
                    </>
                )
            }
        </>
    )
}

export default Filter;