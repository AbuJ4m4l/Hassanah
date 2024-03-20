"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Skeleton, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from 'next/image'
import { useRef, useState } from "react";
import CreateNewPlaylistModal from "./CreateNewPlaylistModal";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";

const PlayLists = () => {
    const t = useTranslations('playlists');
    const [isLoaded, setIsLoaded] = useState(true);
    const { isOpen: isCreateNewPlaylistModalOpen, onOpen: onCreateNewPlaylistModalOpen, onOpenChange: onCreateNewPlaylistModalOpenChange } = useDisclosure();
    const { isOpen: isEditPlaylistModalOpen, onOpen: onEditPlaylistModalOpen, onOpenChange: onEditPlaylistModalOpenChange } = useDisclosure();
    const { isOpen: isDeletePlaylistModalOpen, onOpen: onDeletePlaylistModalOpen, onOpenChange: onDeletePlaylistModalOpenChange } = useDisclosure();
    const [selectedPlaylist, setSelectedPlaylist] = useState({
        id: 1,
        name: 'name',
        total_surahs: 114,
        createdAt: '0000/00/00 - 00:00',
        visibility: 'public'
    });
    return (
        <section role="tab">
            <div className="mt-6 flex justify-center">
                <h1 className="text-xl md:text-2xl">
                    {t('playlists')}
                </h1>
            </div>
            <div className="flex flex-col">
                <div>
                    <Button onClick={onCreateNewPlaylistModalOpen} variant="flat" color="default"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></Button>
                </div>
                <Skeleton isLoaded={isLoaded} className="rounded-lg mt-6 mx-2 md:mx-8">
                    <Table selectionMode="single" color="default" aria-label="Playlists">
                        <TableHeader>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('playlist_name')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('total_surahs')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('visibility')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('actions')}
                                </p>
                            </TableColumn>
                            <TableColumn>
                                <p className="flex justify-center">
                                    {t('created_At')}
                                </p>
                            </TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={t('empty_data')}>
                            <TableRow key="1">
                                <TableCell>
                                    <p className="flex justify-center">
                                        name
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <p className="flex justify-center">114</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <Chip variant="flat" color="success">{t('public')}</Chip>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex justify-center items-center gap-2">
                                        <Tooltip content={t('view')}>
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            </span>
                                        </Tooltip>
                                        <Tooltip content={t('edit')}>
                                            <span onClick={
                                                () => {
                                                    setSelectedPlaylist({
                                                        id: 1,
                                                        name: 'name',
                                                        total_surahs: 114,
                                                        createdAt: '0000/00/00 - 00:00',
                                                        visibility: 'public'
                                                    });
                                                    onEditPlaylistModalOpen();
                                                }
                                            } className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content={t("delete_playlist")}>
                                            <span onClick={
                                                () => {
                                                    setSelectedPlaylist({
                                                        id: 1,
                                                        name: 'name',
                                                        total_surahs: 114,
                                                        createdAt: '0000/00/00 - 00:00',
                                                        visibility: 'public'
                                                    });
                                                    onDeletePlaylistModalOpen();
                                                }
                                            } className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                            </span>
                                        </Tooltip>
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
                </Skeleton>
            </div>
            <CreateNewPlaylistModal isOpen={isCreateNewPlaylistModalOpen} onOpenChange={onCreateNewPlaylistModalOpenChange} />
            <EditPlaylistModal Playlist={selectedPlaylist} isOpen={isEditPlaylistModalOpen} onOpenChange={onEditPlaylistModalOpenChange} />
            <DeletePlaylistModal Playlist={selectedPlaylist} isOpen={isDeletePlaylistModalOpen} onOpenChange={onDeletePlaylistModalOpenChange} />
        </section>
    );
}

export default PlayLists;