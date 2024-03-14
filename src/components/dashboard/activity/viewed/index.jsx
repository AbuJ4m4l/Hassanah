"use client";

import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Viewed = () => {
    const t = useTranslations('activity');
    return (
        <>
            <div className="space-y-10 mt-14">
                <div className="mx-2 md:mx-8 space-y-6">
                    <h1 className="text-xl">{t('quran.viewed_surahs')}:</h1>
                    <Table aria-label="viewed surahs">
                        <TableHeader>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('quran.number')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('quran.name')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('quran.total_ayahs')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('quran.revelationType')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('viewed_At')}
                                </p>
                            </TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={t('quran.empty_data')}>
                            <TableRow key="1">
                                <TableCell>
                                    <p className="flex justify-center">
                                        1
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <p className="flex justify-center">
                                        Al-fatiha
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <p className="flex justify-center">114</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        Meccan
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="flex justify-center">
                                        0000/00/00 - 00:00
                                    </p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div className="mx-2 md:mx-8 space-y-6">
                    <h1 className="text-xl">{t('hadiths.viewed_hadiths')}:</h1>
                    <Table aria-label="viewed hadiths">
                        <TableHeader>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('hadiths.number')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('hadiths.bookSlug')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('hadiths.chapterId')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('hadiths.status')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('viewed_At')}
                                </p>
                            </TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={t('empty_data')}>
                            <TableRow key="1">
                                <TableCell>
                                    <p className="flex justify-center">
                                        1
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <p className="flex justify-center">
                                        sahih-albukhari
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <p className="flex justify-center">
                                        1
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        Sahih
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="flex justify-center">
                                        0000/00/00 - 00:00
                                    </p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <h1 className="text-xl">{t('viewed_stories')}:</h1>

                </div>
            </div>
        </>
    );
}

export default Viewed;