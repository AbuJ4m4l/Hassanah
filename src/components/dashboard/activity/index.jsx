"use client";

import Image from "next/image";
import '../../../../public/css/activity.css'
import { useTranslations } from "next-intl";
import { ChakraProvider, Select } from "@chakra-ui/react";
import theme from "../../../commonTheme";
import { useRef } from "react";
const Activity = () => {
    const t = useTranslations('activity');
    const selectRef = useRef(null);

    return (
        <section role="tab">
            <div className="flex sm:ml-5">
                <ChakraProvider theme={theme}>
                    <Select ref={selectRef} variant='filled' className="w-[120px]">
                        <option className="bg-secondry border-primary border rounded-lg px-4 py-6 text-white" value="viewed">{t('viewed')}</option>
                        <option className="bg-secondry border-primary border rounded-lg px-4 py-6 text-white" value="listned">{t('listned')}</option>
                        <option className="bg-secondry border-primary border rounded-lg px-4 py-6 text-white" value="playlists">{t('playlists')}</option>
                    </Select>
                </ChakraProvider>
            </div>
        </section>
    )
}

export default Activity;