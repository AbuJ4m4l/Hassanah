"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import theme from "../../../commonTheme";
import Viewed from "./viewed";
import Listned from "./listned";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

const Activity = () => {
    const t = useTranslations('activity');
    const [selectedOption, setSelectedOption] = useState('viewed');

    return (
        <section role="tab">
            <div className="sm:ml-5">
                <Select value={selectedOption} onChange={(e) => setSelectedOption(e?.target?.value)} variant='filled' className="max-w-[180px]">
                    <SelectItem className="text-black" value="viewed">{t('viewed')}</SelectItem>
                    <SelectItem className="text-black" value="listned">{t('listned')}</SelectItem>
                </Select>
                {
                    selectedOption === "viewed" ? (
                        <Viewed />
                    ) : selectedOption === "listned" ? (
                        <Listned />
                    ) : <></>
                }
            </div>
        </section>
    )
}

export default Activity;
