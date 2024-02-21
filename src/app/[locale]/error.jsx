'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Error() {
    const router = useRouter();

    const t = useTranslations("error");
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Image
                src="https://svgshare.com/i/12w7.svg"
                alt="PageNotFound Image"
                width={250}
                height={250}
                loading='lazy'></Image>
            <h2 className="mt-4">{t('error')}</h2>
            <button className="btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary mt-4" onClick={() => router.refresh()}>{t('try_again')}</button>
        </div>
    );
}

export default Error;
