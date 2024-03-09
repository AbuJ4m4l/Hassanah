"use client";

import Image from "next/image";
import '../../../../public/css/activity.css'
import { useTranslations } from "next-intl";
import { ChakraProvider, Select } from "@chakra-ui/react";
import theme from "../../../commonTheme";
import { useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const Activity = () => {
    const t = useTranslations('activity');
    const selectRef = useRef(null);
    const selectedOption = selectRef?.current?.value
    const router = useRouter();
    return (
        <section role="tab">
            <div className="sm:ml-5">
                <ChakraProvider theme={theme}>
                    <Select ref={selectRef} variant='filled' className="max-w-[180px]">
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
                                    <h1 className="text-2xl">{t('viewed_surahs')}:</h1>
                                    <div className="mx-5 grid bg-secondry-light rounded-lg mt-6">
                                        <div className="overflow-x-auto overflow-y-hidden max-w-full">
                                            <div className="flex flex-row space-x-5 p-10">
                                                <div className="inline-block max-w-[260px]">
                                                    <div className="ltr:-ml-[25px] ltr:float-right rtl:float-left">
                                                        <button className="rounded-full bg-red-600 p-4">
                                                            <FontAwesomeIcon icon={faTrashCan} size='2xl' />
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-2xl">{t('viewed_hadiths')}:</h1>
                                    <div className="mx-5 grid bg-secondry-light rounded-lg mt-6">
                                        <div className="overflow-x-auto overflow-y-hidden max-w-full">
                                            <div className="flex flex-row space-x-5 p-10">
                                                <div className="min-w-[200px]">
                                                    <FontAwesomeIcon icon={faRemove} className="absolute mt-2 mr-2 text-red-600" />
                                                    <Image
                                                        src="https://picsum.photos/200/125"
                                                        width={200}
                                                        height={125}
                                                        loading="lazy"
                                                        alt="Playlist"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-2xl">{t('viewed_stories')}:</h1>
                                    <div className="mx-5 grid bg-secondry-light rounded-lg mt-6">
                                        <div className="overflow-x-auto overflow-y-hidden max-w-full">
                                            <div className="flex flex-row space-x-5 p-10">
                                                <div className="min-w-[200px]">
                                                    <Image
                                                        src="https://picsum.photos/200/125"
                                                        width={200}
                                                        height={125}
                                                        loading="lazy"
                                                        alt="Playlist"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : selectedOption === "listned" ? (
                        <>
                            h
                        </>
                    ) : selectedOption === "playlists" ? (
                        <>
                            h
                        </>
                    ) : <></>
                }
            </div>
        </section>
    )
}

export default Activity;