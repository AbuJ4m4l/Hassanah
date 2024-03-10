"use client";

import { faArrowUpRightFromSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Viewed = () => {
    const t = useTranslations('activity');
    return (
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
    );
}

export default Viewed;