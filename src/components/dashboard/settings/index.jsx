"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../languageSwitcher";
import WebsiteThemeChanger from "../../WebsiteThemeChanger";
import FontSwitcher from "../../authentication/FontChanger";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const Settings = () => {
  const t = useTranslations("settings");
  const [isAutoPlayAdhanSelected, setIsAutoPlayAdhanSelected] = useState(false);
  const [
    isSendIslamicFestivalsNotificationSelected,
    setIsSendIslamicFestivalsNotificationIsSelected,
  ] = useState(false);
  const reciters = [
    {
      mansourAlZahrani: {
        id: 1,
        name: t("mansour-al-zahrani"),
        audio: "/audios/a11-mansour-al-zahrani.mp3",
      },
    },
    {
      ahmadAlNafees: {
        id: 2,
        name: t("ahmad-al-nafees"),
        audio: "/audios/Ahmad al-Nafees.mp3",
      },
    },
    {
      hafizMustafaOzcanTurkey: {
        id: 3,
        name: t("hafiz-mustafa-ozcan-turkey"),
        audio: "/audios/HafizMustafaOzcanTurkey.mp3",
      },
    },
    {
      karlJenkinsMass: {
        id: 4,
        name: t("karl-jenkins-mass"),
        audio: "/audios/Karl Jenkins Mass.mp3",
      },
    },
    {
      misharyRashedAfassy: {
        id: 5,
        name: t("mishary-rashed-afassy"),
        audio: "/audios/MisharyRashedAfassy.mp3",
      },
    },
    {
      dubaiOneMisharyRashedAfassy: {
        id: 6,
        name: t("dubai-one-mishary-rashed-afassy"),
        audio: "/audios/DubaiOneMisharyRashedAfassy.mp3",
      },
    },
    {
      anotherMisharyRashedAfassy: {
        id: 7,
        name: t("anthor-mishary-rashed-afassy"),
        audio: "/audios/AnthorAdhanMisharyRashedAfassy.mp3",
      },
    },
  ];
  return (
    <section role="tab">
      <div className="mt-6 flex justify-center">
        <h1 className="text-xl md:text-2xl">{t("settings")}</h1>
      </div>

      <div className="flex justify-center mt-8">
        <h2 className="text-lg md:text-xl">{t("accessibility_settings")}</h2>
      </div>
      <h3 className="ltr:ml-8 rtl:mr-8 mt-4">{t("change_theme")}</h3>
      <WebsiteThemeChanger className="ltr:ml-8 rtl:mr-8 mt-4" />
      <h3 className="ltr:ml-8 rtl:mr-8 mt-4">{t("change_language")}</h3>
      <LanguageSwitcher
        location="dashboard"
        className="ltr:ml-8 rtl:mr-8 mt-4"
      />
      <h3 className="ltr:ml-8 rtl:mr-8 mt-4">{t("change_font")}</h3>
      <FontSwitcher className="ltr:ml-8 rtl:mr-8 mt-4" />
      <div className="flex justify-center mt-8">
        <h2 className="text-lg md:text-xl">{t("notification_settings")}</h2>
      </div>
      <div>
        <Checkbox
          className="ltr:ml-8 rtl:mr-8 mt-4"
          isSelected={isSendIslamicFestivalsNotificationSelected}
          onValueChange={setIsSendIslamicFestivalsNotificationIsSelected}
          size="md"
        >
          {t("send_notification_for_islam_festivals")}
        </Checkbox>
        <Checkbox
          className="ltr:ml-8 rtl:mr-8 mt-4"
          isSelected={isAutoPlayAdhanSelected}
          onValueChange={setIsAutoPlayAdhanSelected}
          size="md"
        >
          {t("autoplay_adhan")}
        </Checkbox>
        {isAutoPlayAdhanSelected && (
          <Select
            label={t("select_reciter")}
            className="max-w-xs"
            placeholder={t("select_the_default_reciter_when_adhan_starts")}
          >
            {reciters.map((reciter) => (
              <SelectItem key={reciter.id} value={reciter.id}>
                {reciter.name}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>
    </section>
  );
};

export default Settings;
