"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Skeleton, Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from 'next/image'
import { useState } from "react";

const PlayLists = () => {
    const t = useTranslations('playlists');
    const [isLoaded, setIsLoaded] = useState(true)
    return (
        <div className="flex flex-col">
            <div>
                <Button variant="flat" radius="full" className="py-4 px-6" color="default"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></Button>
            </div>
            <Skeleton isLoaded={isLoaded} className="rounded-lg mt-6 mx-2 md:mx-8">
            <Table aria-label="Playlists">
                <TableHeader>
                    <TableColumn>
                        {t('playlist_name')}
                    </TableColumn>
                    <TableColumn>
                        {t('total_surahs')}
                    </TableColumn>
                    <TableColumn>
                        {t('actions')}
                    </TableColumn>
                    <TableColumn>
                        {t('created_At')}
                    </TableColumn>
                </TableHeader>
                <TableBody emptyContent={t('empty_data')}>
                    <TableRow key="1">
                        <TableCell className="flex-row flex items-center space-x-2">
                            <Image
                                width={96}
                                height={96}
                                className="rounded-lg"
                                alt="Playlist Image"
                                loading="lazy"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            />
                            <h2>name</h2>
                        </TableCell>
                        <TableCell>
                            114
                        </TableCell>
                        <TableCell>
                            <div className="relative flex items-center gap-2">
                                <Tooltip content={t('view')}>
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </span>
                                </Tooltip>
                                <Tooltip content={t('edit')}>
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    </span>
                                </Tooltip>
                                <Tooltip color="danger" content={t("delete_playlist")}>
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </span>
                                </Tooltip>
                            </div>
                        </TableCell>
                        <TableCell>
                            0000/00/00 - 00:00
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Skeleton>
        </div>
    );
}

export default PlayLists;