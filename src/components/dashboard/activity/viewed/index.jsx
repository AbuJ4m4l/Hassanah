"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Viewed = () => {
  const t = useTranslations("activity");
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="space-y-10 mt-14">
        <div className="mx-2 md:mx-8 space-y-6">
          <h1 className="text-xl">{t("quran.viewed_surahs")}:</h1>
          <Table
            aria-label="viewed surahs"
            selectionMode="single"
            color="default"
          >
            <TableHeader>
              <TableColumn>
                <p className="flex justify-center">{t("number")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("quran.name")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("quran.total_ayahs")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">
                  {t("quran.revelationType")}
                </p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("viewed_At")}</p>
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={t("quran.empty_data")}>
              <TableRow href="/quran/surah/1" key="1">
                <TableCell>
                  <p className="flex justify-center">1</p>
                </TableCell>
                <TableCell>
                  <p className="flex justify-center">Al-fatiha</p>
                </TableCell>
                <TableCell>
                  <p className="flex justify-center">7</p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">Meccan</div>
                </TableCell>
                <TableCell>
                  <p className="flex justify-center">0000/00/00 - 00:00</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mx-2 md:mx-8 space-y-6">
          <h1 className="text-xl">{t("hadiths.viewed_hadiths")}:</h1>
          <Table
            aria-label="viewed hadiths"
            selectionMode="single"
            color="default"
          >
            <TableHeader>
              <TableColumn>
                <p className="flex justify-center">{t("number")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("hadiths.bookSlug")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">
                  {t("hadiths.chapterNumber")}
                </p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("hadiths.status")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("viewed_At")}</p>
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={t("empty_data")}>
              <TableRow href="/hadiths/sahih-albukhari/1" key="1">
                <TableCell>
                  <p className="flex justify-center">1</p>
                </TableCell>
                <TableCell>
                  <p className="flex justify-center">sahih-albukhari</p>
                </TableCell>
                <TableCell>
                  <p className="flex justify-center">1</p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">Sahih</div>
                </TableCell>
                <TableCell>
                  <p className="flex justify-center">0000/00/00 - 00:00</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mx-2 md:mx-8 space-y-6">
          <h1 className="text-xl">{t("stories.viewed_stories")}:</h1>
          <Table
            aria-label="viewed stories"
            selectionMode="single"
            color="default"
          >
            <TableHeader>
              <TableColumn>
                <p className="flex justify-center">{t("number")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("stories.title")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">
                  {t("stories.description")}
                </p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("stories.provider")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("stories.publisher")}</p>
              </TableColumn>
              <TableColumn>
                <p className="flex justify-center">{t("viewed_At")}</p>
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={t("empty_data")}>
              <TableRow href="/story/1" key="1">
                <TableCell>
                  <p className="flex justify-center">1</p>
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex justify-center whitespace-nowrap">
                    <Image
                      width={100}
                      height={70}
                      src="https://i.ytimg.com/vi/VdTwmTiIBHk/default.jpg"
                      loading="lazy"
                      alt="thumbnail"
                      className="rtl:ml-4 ltr:mr-4 rounded-lg"
                    />
                    <p className="flex self-center">
                      {truncateText(
                        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                        15
                      )}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="!px-8">
                  <p className="flex justify-center">
                    {truncateText(
                      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                      15
                    )}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                    >
                      <path
                        fill="red"
                        d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"
                      />
                      <path
                        fill="#ffffff"
                        d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z"
                      />
                    </svg>
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <p className="flex justify-center">
                    {truncateText("xxxx xxxxx", 15)}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="flex justify-center">0000/00/00 - 00:00</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Viewed;
