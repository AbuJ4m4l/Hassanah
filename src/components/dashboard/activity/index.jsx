"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import theme from "../../../commonTheme";
import Viewed from "./viewed";
import Listned from "./listned";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

const Activity = () => {
    const t = useTranslations('activity');
    const [selectedOption, setSelectedOption] = useState('viewed');

    return (
        <section role="tab">
                <div className="sm:ml-5">
                        <Select value={selectedOption} onChange={(e) => setSelectedOption(e?.target?.value)} variant='filled' className="max-w-[180px]">
                            <SelectItem className="text-black" value="viewed">{t('viewed')}</SelectItem>
                            <SelectItem className="text-black" value="listned">{t('listned')}</SelectItem>
                        </Select>
                    {
                        selectedOption === "viewed" ? (
                            <Viewed />
                        ) : selectedOption === "listned" ? (
                            <Listned />
                        ) : <></>
                    }
                </div>
        </section>
    )
}

export default Activity;






<div>
                    <h1 className="text-xl">{t('viewed_stories')}:</h1>
                    <div className="mx-5 grid bg-secondry-light rounded-lg mt-6">
                        <div className="overflow-x-auto overflow-y-hidden max-w-full">
                            <div className="flex flex-row space-x-5 p-10">
                                <div className="inline-block max-w-[260px]">
                                    <div className="chip relative sm:-mt-[25px] sm:ltr:-ml-[25px] sm:rtl:-mr-[25px] ltr:float-right rtl:float-left sm:translate-x-0 sm:translate-y-0 -translate-x-5 -translate-y-5">
                                        <button className="rounded-full bg-red-600 p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
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