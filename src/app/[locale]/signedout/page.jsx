"use client";
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Signedout = () => {
    const t = useTranslations('signedout');
    const { status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === 'authenticated') {
            signOut({ redirect: false })
                .then(() => {
                    router.push('/signedout');
                });
        } else {
            router.push('/signedout');
        }
    }, [status, router]);
    return (
        <>
            <div className="flex justify-center">
                <div className="px-16 py-16 rounded-full outline-offset-2 outline-4 outline-green-600 outline">
                    <FontAwesomeIcon icon={faCheck} size={`3x`} style={{ color: `#16a34a` }} />
                </div>
            </div>
            <div className='flex justify-center mt-6'>
                <h2>{t('signedout_successfully')}</h2>
            </div>
        </>
    )
}

export default Signedout;