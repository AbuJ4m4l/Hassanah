"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChakraProvider, Select } from "@chakra-ui/react";
import theme from "../../../commonTheme";
import Viewed from "./viewed";
import Listned from "./listned";
import { useState } from "react";

const Activity = () => {
    const t = useTranslations('activity');
    const [selectedOption, setSelectedOption] = useState('viewed');

    return (
        <section role="tab">
            <ChakraProvider theme={theme}>
                <div className="sm:ml-5">
                    <ChakraProvider theme={theme}>
                        <Select value={selectedOption} onChange={(e) => setSelectedOption(e?.target?.value)} variant='filled' className="max-w-[180px]">
                            <option className="text-black" value="viewed">{t('viewed')}</option>
                            <option className="text-black" value="listned">{t('listned')}</option>
                        </Select>
                    </ChakraProvider>
                    {
                        selectedOption === "viewed" ? (
                            <Viewed />
                        ) : selectedOption === "listned" ? (
                            <Listned />
                        ) : <></>
                    }
                </div>
            </ChakraProvider>
        </section>
    )
}

export default Activity;