"use client";
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

const Signedout = () => {
    const router = useSearchParams();
    const msg = router.get('msg');
    const t = useTranslations('signedout');
    return (
        <>
            {
                msg === "YouDontHaveAccount" ? (
                    <>
                        <div className="flex justify-center">
                            <div className="px-16 py-14 rounded-full outline-offset-2 outline-4 outline-red-600 outline">
                                <FontAwesomeIcon icon={faXmark} size={`3x`} style={{ color: `#dc2626` }} />
                            </div>
                        </div>
                        <div className='flex justify-center mt-6'>
                            <h2>{t('you_dont_have_account')}</h2>
                        </div>
                    </>
                ) : (
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
        </>
    )
}

export default Signedout;