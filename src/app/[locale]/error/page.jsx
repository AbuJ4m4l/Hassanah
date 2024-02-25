"use client"

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const ErrorPage = () => {
    const [Error, setError] = useState(null);
    const router = useSearchParams();
    const t = useTranslations("error");
    useEffect(() => {

    }, [])
    return (
        <>
            {

            }
        </>
    )
}

export default ErrorPage;