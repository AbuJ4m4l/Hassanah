'use client';

import { Button, Image } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import nextImage from 'next/image';
import { useRouter } from 'next/navigation';

function Error() {
    const router = useRouter();

    const t = useTranslations("error");
    return (
        <div className="flex flex-col justify-center items-center">
            <Image
                as={nextImage}
                src="/images/svg/server_down.svg"
                alt="PageNotFound Image"
                width={250}
                height={250}
                loading='eager' />
            <h2 className="mt-4">{t('error')}</h2>
            <Button color='primary' className='mt-4' variant='flat' onClick={() => router.refresh()}>{t('try_again')}</Button>
        </div>
    );
}

export default Error;
