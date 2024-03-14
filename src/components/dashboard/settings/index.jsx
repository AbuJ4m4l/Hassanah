"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../languageSwitcher";

const Settings = () => {
    const t = useTranslations('settings')
    return (
        <section role="tab">
        <div className="mt-6 flex justify-center">
            <h1 className="text-xl md:text-2xl">
                {t('settings')}
                </h1>
                </div>
            <LanguageSwitcher location="dashboard" />
        </section>
    )
}

export default Settings;