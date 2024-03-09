"use client";

import Image from "next/image";
import '../../../../public/css/activity.css'
import { useTranslations } from "next-intl";
import Filter from "./filter";
const Activity = ({ locale }) => {
    const t = useTranslations('activity');
    return (
        <section role="tab">
            <div className="flex sm:ml-5">
                <Filter dir={locale === "ar" ? "rtl" : "ltr"} />
            </div>
        </section>
    )
}

export default Activity;