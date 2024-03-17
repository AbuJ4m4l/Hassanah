"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../languageSwitcher";
import WebsiteThemeChanger from "../../WebsiteThemeChanger";
import FontSwitcher from "../../authentication/FontChanger";
import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Settings = () => {
    const t = useTranslations('settings');
    const [isSelected, setIsSelected] = useState(false);
    /*
    * this file still in dev and there are some errors
     */
    useEffect(() => {
        if (isSelected && (Notification.permission === "denied" || Notification.permission === "default")) {
            Notification.requestPermission().then((permession) => {
                if (permession === "granted") {
                    setIsSelected(true)
                }
            })
                .catch(e => {
                    setIsSelected(false)
                    console.error(e)
                })
        } else {
            setIsSelected(true)
        }
    }, [isSelected])
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
            <h3 className="ltr:ml-8 rtl:mr-8 mt-4">{t('change_font')}</h3>
            <FontSwitcher className="ltr:ml-8 rtl:mr-8 mt-4" />
            <div className="flex justify-center mt-8">
                <h2 className="text-lg md:text-xl">
                    {t('notification_settings')}
                </h2>
            </div>
            <div>
                <Checkbox className="ltr:ml-8 rtl:mr-8 mt-4" isSelected={isSelected} onValueChange={setIsSelected} size="md">{t('send_notification_for_islam_festivals')}</Checkbox>
            </div>
        </section>
    )
}

export default Settings;