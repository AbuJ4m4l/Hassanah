"use client";
import Countdown, { zeroPad } from "react-countdown";
import { Divider, Skeleton, Checkbox } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import useUserLocation from "../../hooks/useUserLocation";
import Link from "next/link";
import moment from "moment";

import SurahsIndex from "../../components/surahsIndex";
const Home = ({ params: { locale } }) => {
  const { position, error, isLoading } = useUserLocation();
  const timeCounterRef = useRef(null);
  const [locationName, setLocationName] = useState(
    locale === "ar" ? "مكة" : "Makkah"
  );
  const [playingStatus, setPlayingStatus] = useState("STOPPED");
  const [isAutoplayAdhanSelected, setIsAutoplayAdhanSelected] = useState(true);
  const [upcomingPrayer, setUpcomingPrayer] = useState("");
  const [upcomingPrayerTime, setUpcomingPrayerTime] = useState();
  const [fixedUpcomingPrayerTime, setFixedUpcomingPrayerTime] = useState("");
  const t = useTranslations("home");

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
        const timings = await fetchPrayerTimes.json();

        const prayer = await getUpcomingPrayer(timings);
        setLocationName(
          location.address.city || location.address.village || location.name
        );

        setUpcomingPrayer(prayer.prayer);
        setUpcomingPrayerTime(moment(prayer.time, "HH:mm").valueOf());

        setFixedUpcomingPrayerTime(prayer.time);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setInterval(() => {
      if (isAutoplayAdhanSelected === true) {
        const currentTime = moment().format("HH:mm");
        if (currentTime === fixedUpcomingPrayerTime) {
          setPlayingStatus("PLAYING");
          setTimeout(() => {
            setPlayingStatus("FINISHED");
          }, 204500);
        }
      }
    }, 1000);
  });
  useEffect(() => {
    GetPrayerTime();
  });

  function getUpcomingPrayer(prayerTimes) {
    const now = moment();
    let upcomingPrayer = null;
    let upcomingPrayerTime = null;

    for (const [prayer, time] of Object.entries(prayerTimes)) {
      const prayerTime = moment(time, "HH:mm");

      // Check if the prayer time is in the future
      if (prayerTime.isAfter(now)) {
        // If this is the first future prayer time, or it's earlier than the current upcoming prayer time, update the upcoming prayer
        if (
          upcomingPrayerTime === null ||
          prayerTime.isBefore(upcomingPrayerTime)
        ) {
          upcomingPrayer = prayer;
          upcomingPrayerTime = prayerTime;
        }
      }
    }

    // If no prayer time is found, use the current day's Fajr time if it's in the future, otherwise use the next day's Fajr time
    if (upcomingPrayer === null) {
      const fajrTime = moment(prayerTimes.Fajr, "HH:mm");
      if (fajrTime.isAfter(now)) {
        return { prayer: "Fajr", time: tomorrowFajr.format("HH:mm") };
      }
      let tomorrowFajr = new Date(fajrTime);
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      return { prayer: "Fajr", time: tomorrowFajr };
    }

    return { prayer: upcomingPrayer, time: upcomingPrayerTime.format("HH:mm") };
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed && playingStatus === "FINISHED") {
      GetPrayerTime();
    } else {
      return (
        <p className="font-medium text-2xl mt-4">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </p>
      );
    }
  };
  return (
    <>
      <section className="my-8 flex justify-center">
        <Skeleton
          className="rounded-large p-2"
          isLoaded={isLoading === true ? false : true}
        >
          {error ? (
            <div
              tabIndex={0}
              className="bg-[#fff] dark:bg-[#171717] p-10 rounded-large focus:outline-none focus-visible:ring focus-visible:ring-focus focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#171717] focus-visible:ring-offset-[#f8f5f5]"
            >
              <div className="flex justify-center">
                <h1>{t("cannot_get_location_to_get_prayer_time")}</h1>
              </div>

              <div>
                <div className="mt-2 bg-danger px-6 py-2 rounded-large flex justify-center items-center">
                  <h1 className="text-center md:text-xl text-large font-medium">
                    {error}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            locationName &&
            upcomingPrayer &&
            upcomingPrayerTime && (
              <div
                tabIndex={0}
                className="dark:bg-[#171717] bg-[#fff] p-10 rounded-large focus:outline-none focus-visible:ring focus-visible:ring-focus focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#171717] focus-visible:ring-offset-[#f8f5f5]"
              >
                <div>
                  <div className="flex justify-center">
                    <h1 className="text-center md:text-xl text-large font-medium">
                      {t("upcoming_prayer", {
                        city: locationName,
                      })}
                      <br />
                      {t(`prayers.${upcomingPrayer}`)}
                    </h1>
                  </div>
                  <div className="flex justify-center">
                    {upcomingPrayer ? (
                      <Countdown
                        key={new Date(upcomingPrayerTime)}
                        autoStart
                        daysInHours
                        zeroPadTime={2}
                        date={new Date(upcomingPrayerTime)}
                        ref={timeCounterRef}
                        renderer={renderer}
                      />
                    ) : (
                      <p className="font-medium text-2xl mt-4">00:00:00</p>
                    )}
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
                  {isAutoplayAdhanSelected && playingStatus === "PLAYING" ? (
                    <audio autoPlay src="/audios/Ahmad al-Nafees.mp3" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )
          )}
        </Skeleton>
      </section>
      <Divider />
      <section className="my-8 mx-8">
        <SurahsIndex locale={locale} />
      </section>
    </>
  );
};

export default Home;
