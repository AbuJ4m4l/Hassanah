"use client";

import { Button, ChakraProvider, Menu, MenuButton, MenuItem, MenuList, Select } from "@chakra-ui/react";
import theme from '../../../commonTheme'
import { useTranslations } from "next-intl";
import Viewed from "./viewed";
import Link from "next/link";

const Filter = () => {
    const t = useTranslations('activity')
    return (
        <>
            <ChakraProvider theme={theme}>
                <Select variant='filled'>
                    <option>{t('viewed')}</option>
                    <option>{t('listned')}</option>
                    <option>{t('playlists')}</option>
                </Select>
            </ChakraProvider>
        </>
    )
}

export default Filter;