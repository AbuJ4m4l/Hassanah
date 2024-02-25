"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const ErrorPage = () => {
    const [Err, setError] = useState(null);
    const [ErrorDescription, setErrorDescription] = useState(null);
    const router = useSearchParams();
    const route = useRouter();
    const t = useTranslations("error");
    const errors = {
        Configuration: t('Configuration'),
        AccessDenied: t('AccessDenied_title'),
        Default: t('Default_title'),
        InternalError: t('internal_server_error'),
    };
    const errorsDescriptions = {
        AccessDenied: t('AccessDenied_description'),
        Default: t('Default_description')
    };
    useEffect(() => {
        async function fetchError() {
            const error = router.get('error');
            if (error) {
                if (error.toLowerCase() === 'Configuration'.toLowerCase()) {
                    setError(errors.Configuration);
                }
                if (error.toLowerCase() === 'AccessDenied'.toLowerCase()) {
                    setError(errors.AccessDenied);
                    setErrorDescription(errorsDescriptions.AccessDenied);
                }
                if (error.toLowerCase() === 'Default'.toLowerCase()) {
                    setError(errors.Default);
                    setErrorDescription(errorsDescriptions.Default);
                }
                if (error.toLowerCase() && error.toLowerCase() !== 'AccessDenied'.toLowerCase() && error.toLowerCase() !== 'Default'.toLowerCase() && error.toLowerCase() !== 'Configuration'.toLowerCase()) {
                    setError(errors.InternalError);
                }
            } else {
                route.push('/');
            }
        }
        fetchError();
    })
    return (
        <>
            {
                Err && (
                    <>
                        <div className="flex justify-center mx-4">
                            <Image
                                src="/images/server_down.svg"
                                width={250}
                                height={250}
                                alt="Server down"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex mx-4 justify-center mt-5">
                            <h2 className="text-center">{Err}</h2>
                        </div>
                        <div className="flex justify-center">
                            {
                                ErrorDescription && (
                                    <>
                                        <h3 className="text-center mt-5 mx-4">{ErrorDescription}</h3>
                                    </>
                                )
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ErrorPage;