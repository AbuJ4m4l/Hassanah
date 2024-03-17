"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../languageSwitcher";
import WebsiteThemeChanger from "../../WebsiteThemeChanger";

const Settings = () => {
    const t = useTranslations('settings')
    return (
        <section role="tab">
            <div className="mt-6 flex justify-center">
                <h1 className="text-xl md:text-2xl">
                    {t('settings')}
                </h1>
            </div>

            <div className="flex justify-center mt-8">
                <h2 className="text-lg md:text-xl">
                    {t('accessibility_settings')}
                </h2>
            </div>
            <h3 className="ltr:ml-8 rtl:mr-8 mt-4">{t('change_theme')}</h3>
            <WebsiteThemeChanger className="ltr:ml-8 rtl:mr-8 mt-4" />
            <h3 className="ltr:ml-8 rtl:mr-8 mt-4">{t('change_language')}</h3>
            <LanguageSwitcher location="dashboard" className="ltr:ml-8 rtl:mr-8 mt-4" />
        </section>
    )
}

export default Settings;