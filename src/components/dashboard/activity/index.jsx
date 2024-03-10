"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChakraProvider, Select, useDisclosure } from "@chakra-ui/react";
import theme from "../../../commonTheme";
import { useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faEllipsisVertical, faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import {
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
} from '@chakra-ui/react';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Activity = () => {
    const t = useTranslations('activity');
    const [selectedOption, setSelectedOption] = useState('viewed');
    const [playlistName, setPlaylistNameInput] = useState('');
    const [playlistDescription, setPlaylistDesciptionInput] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const createNewPlaylist = () => {
        /* TODO: create new function that creates newPlaylist */
    };
    return (
        <section role="tab">
            <div className="sm:ml-5">
                <ChakraProvider theme={theme}>
                    <Select value={selectedOption} onChange={(e) => setSelectedOption(e?.target?.value)} variant='filled' className="max-w-[180px]">
                        <option className="text-black" value="viewed">{t('viewed')}</option>
                        <option className="text-black" value="listned">{t('listned')}</option>
                        <option className="text-black" value="playlists">{t('playlists')}</option>
                    </Select>
                </ChakraProvider>
                {
                    selectedOption === "viewed" ? (
                        <>
                            <div className="space-y-10 mt-14">
                                <div>
                                    <h1 className="text-xl">{t('viewed_surahs')}:</h1>
                                    <div className="mx-5 grid bg-secondry-light rounded-lg mt-6">
                                        <div className="overflow-x-hidden overflow-y-auto max-h-[300px]">
                                            <div className="flex flex-col space-x-5 p-10">
                                                <div className="inline-block">
                                                    <ul className="space-y-4">
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx surah - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx surah - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx surah - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx surah - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx surah - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx surah - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-xl">{t('viewed_hadiths')}:</h1>
                                    <div className="mx-5 grid bg-secondry-light rounded-lg mt-6">
                                        <div className="overflow-x-hidden overflow-y-auto max-h-[300px]">
                                            <div className="flex flex-col space-x-5 p-10">
                                                <div className="inline-block">
                                                    <ul className="space-y-4">
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx hadith - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx hadith - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx hadith - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx hadith - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx hadith - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                        <li className="no-underline hover:underline decoration-2 decoration-primary"><Link href="#">xxx hadith - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-xl">{t('viewed_stories')}:</h1>
                                    <div className="mx-5 grid bg-secondry-light rounded-lg mt-6">
                                        <div className="overflow-x-auto overflow-y-hidden max-w-full">
                                            <div className="flex flex-row space-x-5 p-10">
                                                <div className="inline-block max-w-[260px]">
                                                    <div className="chip relative sm:-mt-[25px] sm:ltr:-ml-[25px] sm:rtl:-mr-[25px] ltr:float-right rtl:float-left sm:translate-x-0 sm:translate-y-0 -translate-x-5 -translate-y-5">
                                                        <button className="rounded-full bg-red-600 p-4">
                                                            <FontAwesomeIcon icon={faTrashCan} size='xl' />
                                                        </button>
                                                    </div>
                                                    <Image
                                                        src="https://picsum.photos/200/125"
                                                        width={200}
                                                        height={125}
                                                        loading="lazy"
                                                        alt="Playlist"
                                                        onClick=""
                                                    />
                                                    <br />
                                                    <strong>
                                                        Title
                                                    </strong>
                                                    <p>xxxx/xx/xx - xx:xx</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : selectedOption === "listned" ? (
                        <>
                            <div>
                                <h1 className="text-xl mt-14">{t('listned_surahs')}:</h1>
                                <div className="mx-5 grid bg-secondry-light rounded-lg mt-6">
                                    <div className="overflow-x-hidden overflow-y-auto max-h-[300px]">
                                        <div className="flex flex-col space-x-5 p-10">
                                            <div className="inline-block">
                                                <ul className="space-y-6">
                                                    <li className="flex-row flex space-x-4 no-underline hover:underline decoration-2 decoration-primary"><Image src={"/images/reciters/yasser-al-dosry.png"} alt="rectier photo" width={75} height={125} loading="lazy" className="rounded-md" /><Link href="#">xxx surah - xxx rectier - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                    <li className="flex-row flex space-x-4 no-underline hover:underline decoration-2 decoration-primary"><Image src={"/images/reciters/yasser-al-dosry.png"} alt="rectier photo" width={75} height={125} loading="lazy" className="rounded-md" /><Link href="#">xxx surah - xxx rectier - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                    <li className="flex-row flex space-x-4 no-underline hover:underline decoration-2 decoration-primary"><Image src={"/images/reciters/yasser-al-dosry.png"} alt="rectier photo" width={75} height={125} loading="lazy" className="rounded-md" /><Link href="#">xxx surah - xxx rectier - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                    <li className="flex-row flex space-x-4 no-underline hover:underline decoration-2 decoration-primary"><Image src={"/images/reciters/yasser-al-dosry.png"} alt="rectier photo" width={75} height={125} loading="lazy" className="rounded-md" /><Link href="#">xxx surah - xxx rectier - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                    <li className="flex-row flex space-x-4 no-underline hover:underline decoration-2 decoration-primary"><Image src={"/images/reciters/yasser-al-dosry.png"} alt="rectier photo" width={75} height={125} loading="lazy" className="rounded-md" /><Link href="#">xxx surah - xxx rectier - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                    <li className="flex-row flex space-x-4 no-underline hover:underline decoration-2 decoration-primary"><Image src={"/images/reciters/yasser-al-dosry.png"} alt="rectier photo" width={75} height={125} loading="lazy" className="rounded-md" /><Link href="#">xxx surah - xxx rectier - xxxx/xx/xx - xx:xx <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="rtl:mr-4 ltr:ml-4" /></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : selectedOption === "playlists" ? (
                        <>
                            <div className="mt-14 flex flex-col">
                                <div>
                                    <button onClick={onOpen} className="rounded-full bg-secondry px-6 py-4 rtl:float-right ltr:float-left"><FontAwesomeIcon icon={faPlus} /></button>
                                </div>
                                <ChakraProvider theme={theme}>
                                    <Modal
                                        initialFocusRef={initialRef}
                                        finalFocusRef={finalRef}
                                        isOpen={isOpen}
                                        onClose={onClose}
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
                                                <button onClick={onClose}>{t('cancel')}</button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </ChakraProvider>
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
                                                            <FontAwesomeIcon icon={faEllipsisVertical} className="rtl:mr-4 ltr:ml-4 mt-1.5" />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : <></>
                }
            </div>
        </section>
    )
}

export default Activity;