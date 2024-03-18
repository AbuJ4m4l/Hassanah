"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const Listned = () => {
  const t = useTranslations("activity");
  return (
    <div className="mt-14 mx-2 md:mx-8 space-y-6">
      <h1 className="text-xl">{t("quran.listned_surahs")}:</h1>
      <Table aria-label="viewed surahs" selectionMode="single" color="default">
        <TableHeader>
          <TableColumn>
            <p className="flex justify-center">{t("number")}</p>
          </TableColumn>
          <TableColumn>
            <p className="flex justify-center">{t("quran.name")}</p>
          </TableColumn>
          <TableColumn>
            <p className="flex justify-center">{t("quran.reciter")}</p>
          </TableColumn>
          <TableColumn>
            <p className="flex justify-center">{t("quran.total_ayahs")}</p>
          </TableColumn>
          <TableColumn>
            <p className="flex justify-center">{t("quran.revelationType")}</p>
          </TableColumn>
          <TableColumn>
            <p className="flex justify-center">{t("listned_At")}</p>
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
              <p className="flex justify-center">Yasser aldossry</p>
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
  );
};

export default Listned;
