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
            <div className="sm:ml-5">
                <Filter selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
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
