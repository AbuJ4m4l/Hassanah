"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const Filter = ({selectedOption, setSelectedOption, className}) => {
    const t = useTranslations('activity')
    return (
        <>
            <Select value={selectedOption} defaultSelectedKeys={["viewed"]} onChange={(e) => setSelectedOption(e?.target?.value)} variant='flat' className={className ?? className}>
                    <SelectItem value="viewed" key="viewed">{t('viewed')}</SelectItem>
                    <SelectItem value="listned" key="listned">{t('listned')}</SelectItem>
                </Select>
        </>
    )
}

export default Filter;