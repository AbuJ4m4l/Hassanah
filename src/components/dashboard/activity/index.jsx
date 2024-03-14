"use client";

import { useTranslations } from "next-intl";
import Viewed from "./viewed";
import Listned from "./listned";
import { useState } from "react";
import Filter from "./filter";

const Activity = () => {
    const t = useTranslations('activity');
    const [selectedOption, setSelectedOption] = useState('viewed');

    return (
        <section role="tab">
            <div className="mt-6 flex justify-center">
                <h1 className="text-xl md:text-2xl">
                    {t('activity')}
                    </h1>
                    </div>
                <div className="flex justify-center mt-6">
                <Filter className="max-w-[180px]" selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                </div>
                {
                    selectedOption === "viewed" ? (
                        <Viewed />
                    ) : selectedOption === "listned" ? (
                        <Listned />
                    ) : <></>
                }
        </section>
    )
}

export default Activity;
