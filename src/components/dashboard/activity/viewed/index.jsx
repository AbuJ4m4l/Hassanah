"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Viewed = () => {
    const t = useTranslations('activity');
    return (
        <>
            <div className="space-y-10 mt-14">
                <div>
                    <h1 className="text-xl">{t('viewed_surahs')}:</h1>

                </div>

                <div>
                    <h1 className="text-xl">{t('viewed_hadiths')}:</h1>

                </div>

                <div>
                    <h1 className="text-xl">{t('viewed_stories')}:</h1>
                   
                </div>
            </div>
        </>
    );
}

export default Viewed;