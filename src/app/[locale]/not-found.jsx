import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    const t = useTranslations("not_found")
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <Image
                    src="/images/page_not_found.svg"
                    alt="PageNotFound Image"
                    width={250}
                    height={250}
                    loading="lazy"></Image>
                <h2 className="mt-4">{t('not_found')}</h2>
                <button className="btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary mt-4">
                    <Link href={"/"}>{t('home')}</Link>
                </button>
            </div>
        </>
    )
}
