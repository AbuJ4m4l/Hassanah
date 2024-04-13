"use client";
import { Skeleton } from "@nextui-org/react";
import Countdown, { zeroPad } from "react-countdown";
import {
  Divider,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HlsPlayer from "../../components/HlsPlayer";
import { Changa, Russo_One } from "next/font/google";
import useUserLocation from "../../hooks/useUserLocation";
import Link from "next/link";
import moment from "moment";

export const russo = Russo_One({ weight: ["400"], subsets: ["latin"] });
export const changa = Changa({ weight: ["600"], subsets: ["arabic"] });

const Home = ({ params: { locale } }) => {
  const { position, error, isLoading } = useUserLocation();
  const [surahNames, setSurahNames] = useState([]);
  const [locationName, setLocationName] = useState(
    locale === "ar" ? "مكة" : "Makkah"
  );
  const [isAutoplayAdhanSelected, setIsAutoplayAdhanSelected] = useState(true);
  const [upcomingPrayer, setUpcomingPrayer] = useState("Fajr");
  const [upcomingPrayerTime, setUpcomingPrayerTime] = useState();
  const [Channel, setChannel] = useState(
    "https://win.holol.com/live/quran/playlist.m3u8"
  );
  const router = useRouter();
  const t = useTranslations("home");

  const channels = [
    {
      id: 1,
      enName: "Quran channel",
      name: "قناة القرآن الكريم",
      url: "https://win.holol.com/live/quran/playlist.m3u8",
    },
    {
      id: 2,

      enName: "Sunna channel",
      name: "قناة السنة النبوية",
      url: "https://win.holol.com/live/sunnah/playlist.m3u8",
    },
  ];
  const GetPrayerTime = async () => {
    try {
      if (error) {
        return;
      } else {
        const fetchLocation = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.latitude}&lon=${position.longitude}`
        );
        const location = await fetchLocation.json();
        const date = moment().format("YYYY-MM-DD");
        const fetchPrayerTimes = await fetch(
          `http://38.242.214.31:3002/api/v1/getPrayerTimesByAddress?address=${position.latitude}, ${position.longitude}&date=${date}`
        );
        const prayerTimes = await fetchPrayerTimes.json();
        const timings = {
          Fajr: "04:30",
          Dhuhr: "12:30",
          Asr: "16:32",
          Maghrib: "18:21",
          Isha: "21:00",
        };
        const prayer = await getUpcomingPrayer(timings);
        setLocationName(
          location.address.city || location.address.village || location.name
        );

        setUpcomingPrayer(prayer.prayer);
        setUpcomingPrayerTime(moment(prayer.time, "HH:mm").valueOf());
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const GetData = async () => {
      const dbName = "localdb";
      const storeName = "surahs";

      try {
        const request = window.indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore(storeName, { keyPath: "id" });
        };

        request.onsuccess = async (event) => {
          const db = event.target.result;
          const transaction = db.transaction([storeName], "readonly");
          const store = transaction.objectStore(storeName);
          const data = await getAllData(store);

          if (data.length > 0) {
            setSurahNames(data);
          } else {
            const response = await fetch(
              "http://38.242.214.31:3002/api/v1/surahs/all"
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const fetchedData = await response.json();
            await storeData(db, storeName, fetchedData);
            setSurahNames(fetchedData.surahs);
          }
        };

        request.onerror = (event) => {
          console.error(
            "Error opening IndexedDB database:",
            event.target.error
          );
        };
      } catch (error) {
        console.error("Error fetching or storing data:", error);
      }
    };

    GetPrayerTime();
    GetData();
  }, [position]);

  async function getAllData(store) {
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  async function storeData(db, storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      data.surahs.forEach((item) => {
        store.put(item);
      });
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  function getUpcomingPrayer(prayerTimes) {
    const now = moment();
    let upcomingPrayer = null;
    let upcomingPrayerTime = null;
    for (const [prayer, time] of Object.entries(prayerTimes)) {
      const prayerTime = moment(time, "HH:mm");
      if (
        prayerTime.isAfter(now) &&
        (upcomingPrayerTime === null || prayerTime.isBefore(upcomingPrayerTime))
      ) {
        upcomingPrayer = prayer;
        upcomingPrayerTime = prayerTime;
      }
    }
    if (upcomingPrayer === null) {
      const tomorrowFajr = moment(prayerTimes.Fajr, "HH:mm").add(1, "day");
      return { prayer: "Fajr", time: tomorrowFajr.format("HH:mm") };
    }

    return { prayer: upcomingPrayer, time: upcomingPrayerTime.format("HH:mm") };
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <p className="font-semibold text-2xl mt-4 text-danger">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </p>
      );
    } else {
      return (
        <p className="font-semibold text-2xl mt-4">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </p>
      );
    }
  };
  return (
    <>
      <section className="my-8">
        <div className="flex justify-center">
          <Input
            classNames={{
              base: "max-w-[280px] md:max-w-[500px] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder={t("type_to_search")}
            size="sm"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            }
            type="search"
          />
        </div>
      </section>
      <Divider />
      <section className="my-8 flex justify-center">
        <Skeleton
          className="rounded-large"
          isLoaded={isLoading === true ? false : true}
        >
          {error ? (
            <div className="bg-[#171717] p-10 rounded-large">
              <div>
                <div className="bg-danger px-6 py-2 rounded-large flex justify-center items-center">
                  <h1 className="text-center md:text-xl text-large font-medium ">
                    {error}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            locationName &&
            upcomingPrayer &&
            upcomingPrayerTime && (
              <div className="bg-[#171717] p-10 rounded-large">
                <div>
                  <div className="flex justify-center">
                    <h1 className="text-center md:text-xl text-large font-medium md:font-bold">
                      {t("upcoming_prayer", {
                        city: locationName,
                      })}
                      <br />
                      {t(`prayers.${upcomingPrayer}`)}
                    </h1>
                  </div>
                  <div className="flex justify-center">
                    <Countdown
                      autoStart
                      daysInHours
                      zeroPadTime={2}
                      date={new Date(upcomingPrayerTime)}
                      renderer={renderer}
                    />
                  </div>
                  <div className="mt-6">
                    <Link href="/prayer-times" className="underline">
                      {t("show_more")}
                    </Link>
                  </div>
                  <Checkbox
                    className="mt-2"
                    isSelected={isAutoplayAdhanSelected}
                    onValueChange={setIsAutoplayAdhanSelected}
                  >
                    <span className="rtl:mr-2 ltr:ml-2">
                      {t("autoplay_adhan")}
                    </span>
                  </Checkbox>
                </div>
              </div>
            )
          )}
        </Skeleton>
      </section>
      <Divider />
      <section className="my-8">
        <div className="flex justify-center">
          <h1
            className={`${
              locale === "en" ? russo.className : changa.className
            } text-2xl font-bold mb-4`}
          >
            {t("live_channel")}
          </h1>
        </div>
        <div className="flex justify-center mt-10">
          <div className="w-[280px] md:w-[400px]">
            <div className="flex justify-center">
              <Select
                label={t("select_channel")}
                placeholder={t("select_live_channel")}
                className="max-w-xs"
                value={Channel}
                onChange={(e) => setChannel(e?.target?.value)}
                defaultSelectedKeys={[
                  "https://win.holol.com/live/quran/playlist.m3u8",
                ]}
              >
                {channels.map((channel) => (
                  <SelectItem value={channel.url} key={channel.url}>
                    {locale === "ar" ? channel.name : channel.enName}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex justify-center mt-6">
              <HlsPlayer src={Channel} />
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section className="my-8 mx-8">
        <div className="flex justify-center mt-4">
          <h1
            className={`${
              locale === "en" ? russo.className : changa.className
            } text-2xl font-bold mb-4`}
          >
            {t("surahs")}
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 px-4 xl:px-[300px]">
          {surahNames.map((surah) => (
            <div
              key={surah.id}
              tabIndex={0}
              onClick={() => router.push(`/surah/${surah.id}`)}
              className={`cursor-pointer bg-[#171717] hover:bg-[#101010] p-4 rounded-md flex flex-col focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]`}
            >
              <div className="flex flex-row">
                <div className="rtl:ml-2 ltr:mr-2 rounded-full px-4 py-2 bg-[#060606]">
                  {surah.id}
                </div>
                <div className="mt-2">
                  {locale === "ar" ? surah.name : surah.englishName}
                </div>
              </div>
              <p className="text-slate-400 text-medium mt-2">
                {locale === "ar" ? (
                  <>
                    {t(`revelationType.${surah.revelationType}`)} -{" "}
                    {surah.totalAyahs} {t("total_ayahs")}
                  </>
                ) : (
                  <>
                    {surah.englishNameTranslation} -{" "}
                    {t(`revelationType.${surah.revelationType}`)} -{" "}
                    {surah.totalAyahs} {t("total_ayahs")}
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
