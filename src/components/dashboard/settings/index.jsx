"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../languageSwitcher";
import WebsiteThemeChanger from "../../WebsiteThemeChanger";
import FontSwitcher from "../../authentication/FontChanger";
import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

const Settings = () => {
  const t = useTranslations("settings");
  const [isAutoPlayAdhanSelected, setIsAutoPlayAdhanSelected] = useState(false);
  const [isPrayerNotifierSelected, setIsPrayerNotifierSelected] =
    useState(false);
  const [
    isSendNotificationWhenNewStoryUploads,
    setIsSendNotificationWhenNewStoryUploads,
  ] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(0);
  const [
    isSendIslamicFestivalsNotificationSelected,
    setIsSendIslamicFestivalsNotificationIsSelected,
  ] = useState(false);
  const reciters = [
    {
      id: 0,
      name: t("mansour-al-zahrani"),
      audio: "/audios/a11-mansour-al-zahrani.mp3",
    },
    {
      id: 1,
      name: t("ahmad-al-nafees"),
      audio: "/audios/Ahmad al-Nafees.mp3",
    },
    {
      id: 2,
      name: t("hafiz-mustafa-ozcan-turkey"),
      audio: "/audios/HafizMustafaOzcanTurkey.mp3",
    },
    {
      id: 3,
      name: t("karl-jenkins-mass"),
      audio: "/audios/Karl Jenkins Mass.mp3",
    },
    {
      id: 4,
      name: t("mishary-rashed-afassy"),
      audio: "/audios/MisharyRashedAfassy.mp3",
    },
    {
      id: 5,
      name: t("dubai-one-mishary-rashed-afassy"),
      audio: "/audios/DubaiOneMisharyRashedAfassy.mp3",
    },
    {
      id: 6,
      name: t("anthor-mishary-rashed-afassy"),
      audio: "/audios/AnthorAdhanMisharyRashedAfassy.mp3",
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
        <div className="ltr:ml-8 rtl:mr-8 mt-4 flex-col flex space-y-4">
          <Checkbox
            isSelected={isSendIslamicFestivalsNotificationSelected}
            onValueChange={setIsSendIslamicFestivalsNotificationIsSelected}
            size="md"
          >
            <p className="rtl:mr-2">
              {t("send_notification_for_islam_festivals")}
            </p>
          </Checkbox>
          <Checkbox
            isSelected={isAutoPlayAdhanSelected}
            onValueChange={setIsAutoPlayAdhanSelected}
            size="md"
          >
            <p className="rtl:mr-2"> {t("autoplay_adhan")}</p>
          </Checkbox>

          {isAutoPlayAdhanSelected && (
            <Select
              label={t("select_reciter")}
              className="max-w-xs"
              placeholder={t("select_the_default_reciter_when_adhan_starts")}
              value={selectedReciter}
              onChange={(e) => setSelectedReciter(e.target?.value)}
              defaultSelectedKeys={["0"]}
              isRequired
            >
              {reciters.map((reciter) => (
                <SelectItem key={reciter.id} value={reciter.id}>
                  {reciter.name}
                </SelectItem>
              ))}
            </Select>
          )}
          {isAutoPlayAdhanSelected ? (
            <audio
              src={reciters[selectedReciter]?.audio}
              autoPlay
              controls
            ></audio>
          ) : (
            ""
          )}
          <Checkbox
            isSelected={isPrayerNotifierSelected}
            onValueChange={setIsPrayerNotifierSelected}
            size="md"
          >
            <p className="rtl:mr-2">{t("prayer_notifier")}</p>
          </Checkbox>
          {isPrayerNotifierSelected ? (
            <Autocomplete
              size="md"
              label={t("your_city")}
              placeholder={t("select_your_city_when_prayer_starts")}
              className="max-w-xs"
              isRequired
              defaultSelectedKey="0"
            >
              <AutocompleteItem key="0">
                Country/City (Timezone)
              </AutocompleteItem>
            </Autocomplete>
          ) : (
            ""
          )}

          <Checkbox
            isSelected={isSendNotificationWhenNewStoryUploads}
            onValueChange={setIsSendNotificationWhenNewStoryUploads}
            size="md"
          >
            <p className="rtl:mr-2">
              {" "}
              {t("send_notification_when_new_story_uploads")}
            </p>
          </Checkbox>
        </div>
      </div>
    </section>
  );
};

export default Settings;
