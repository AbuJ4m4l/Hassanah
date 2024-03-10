"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faEye, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    ChakraProvider,
} from '@chakra-ui/react';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import theme from "../../../commonTheme";
import { useTranslations } from "next-intl";

const Playlists = () => {
    const t = useTranslations('activity');
    const [playlistName, setPlaylistNameInput] = useState('');
    const [playlistDescription, setPlaylistDesciptionInput] = useState('');
    const [EditPlaylistName, setEditPlaylistNameInput] = useState('');
    const [EditPlaylistDescription, setEditPlaylistDesciptionInput] = useState('');
    const {
        isOpen: ModalIsOpen,
        onOpen: ModalOnOpen,
        onClose: ModalOnClose
    } = useDisclosure();

    const {
        isOpen: EditModalIsOpen,
        onOpen: EditModalOnOpen,
        onClose: EditModalOnClose
    } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const createNewPlaylist = () => {
        /* TODO: create new function that creates newPlaylist */
    };
    return (
        <ChakraProvider theme={theme}>
            <div className="mt-4 flex flex-col">
                <div>
                    <button onClick={ModalOnOpen} className="rounded-full bg-secondry px-6 py-4 rtl:float-right ltr:float-left"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={ModalIsOpen}
                    onClose={ModalOnClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{t('create_playlist')}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>{t('playlist_name')}</FormLabel>
                                <Input ref={initialRef} placeholder={t('playlist_name')} variant="filled" value={playlistName} onChange={(e) => setPlaylistNameInput(e?.target?.value)} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>{t('playlist_description')}</FormLabel>
                                <Input variant='filled' placeholder={t('playlist_description')} value={playlistDescription} onChange={(e) => setPlaylistDesciptionInput(e?.target?.value)} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <button onClick={createNewPlaylist} className="btn mr-3 bg-primary">
                                {t('create')}
                            </button>
                            <button onClick={ModalOnClose}>{t('cancel')}</button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <div className="mt-5">
                    <div className="mx-5 bg-secondry-light rounded-lg mt-6">
                        <div className="h-auto">
                            <div className="flex flex-col space-x-5 p-10">
                                <div className="inline-block">
                                    <ul className="space-y-6">
                                        <li className="flex-row flex space-x-4 no-underline hover:underline decoration-2 decoration-primary">
                                            <Image src={"/images/reciters/yasser-al-dosry.png"} alt="rectier photo" width={75} height={125} loading="lazy" className="rounded-md" />
                                            <Link href="#">
                                                XXX (Playlist)
                                            </Link>
                                            <Menu>
                                                <MenuButton className="rtl:mr-4 ltr:ml-4 -translate-y-5">
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem onClick={EditModalOnOpen}>{t('edit')} <FontAwesomeIcon className="ltr:ml-2 rtl:mr-2" icon={faPencil} /></MenuItem>
                                                    <MenuItem>{t('view')} <FontAwesomeIcon className="ltr:ml-2 rtl:mr-2" icon={faEye} /></MenuItem>
                                                    <MenuItem>{t('delete')} <FontAwesomeIcon className="ltr:ml-2 rtl:mr-2" icon={faTrashCan} /></MenuItem>
                                                </MenuList>
                                            </Menu>
                                            <Modal
                                                initialFocusRef={initialRef}
                                                finalFocusRef={finalRef}
                                                isOpen={EditModalIsOpen}
                                                onClose={EditModalOnClose}
                                            >
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>{t('edit_playlist')}</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody pb={6}>
                                                        <FormControl>
                                                            <FormLabel>{t('edit_playlist_name')}</FormLabel>
                                                            <Input ref={initialRef} placeholder={t('edit_playlist_name')} variant="filled" value={EditPlaylistName} onChange={(e) => setEditPlaylistNameInput(e?.target?.value)} />
                                                        </FormControl>

                                                        <FormControl mt={4}>
                                                            <FormLabel>{t('edit_playlist_description')}</FormLabel>
                                                            <Input variant='filled' placeholder={t('edit_playlist_description')} value={EditPlaylistDescription} onChange={(e) => setEditPlaylistDesciptionInput(e?.target?.value)} />
                                                        </FormControl>
                                                    </ModalBody>

                                                    <ModalFooter>
                                                        <button onClick={createNewPlaylist} className="btn mr-3 bg-primary">
                                                            {t('save')}
                                                        </button>
                                                        <button onClick={EditModalOnClose}>{t('cancel')}</button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChakraProvider>
    )
}

export default Playlists;