"use client";

import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Listned = () => {
    const t = useTranslations('activity');
    return (
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
    );
}

export default Listned;