"use client";
import { Box, SkeletonText } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Verify() {
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useSearchParams();
    const { data: session, status } = useSession();
    const t = useTranslations('verify');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://38.242.214.31:3002/api/v1/verify?verificationToken=${router.get('code')}&provider=${router.get('provider') ?? 'user'}`);
                const dt = await response.json();

                if (dt.success === true) {
                    setData(t('success_verification'));
                    setIsLoaded(true);
                } else {
                    setIsLoaded(true);
                    if (dt.error === 'Invalid Request') {
                        setErr(t('invalid_request'));
                    }
                    if (dt.error === 'Invalid provider') {
                        setErr(t('invalid_provider'));
                    }
                    if (dt.error === 'Verification Token not found') {
                        setErr(t('verification_token_not_found'));
                    }
                    if (dt.error === 'User already verified') {
                        setErr(t('user_already_verified'));
                    }
                    if (dt.error === 'Internal Server Error') {
                        setErr(t('internal_server_error'));
                    }
                    if (dt.error === 'User is blocked') {
                        setErr(t('user_is_blocked'));
                    }
                }
            } catch (error) {
                setErr(t('internal_server_error'));
            }
        }
        fetchData();
    });

    return (
        <>
            {data ? (
                <>
                    <div className='flex justify-center'>
                        <Image
                            src='/images/verified.svg'
                            alt='verified'
                            width={250}
                            height={250}
                            loading='lazy'
                        />
                    </div>
                    <br />
                    <div className='flex justify-center'>
                        <h2 className='font-medium'>{data}</h2>
                    </div>
                    <div className='flex justify-center'>
                        <button className="btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary mt-4">
                            <Link href={"/"}>{t('home')}</Link>
                        </button>
                    </div>
                </>
            ) : isLoaded === false ? (
                <>
                    <Box padding='6' boxShadow='lg'>
                        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
                        <br />
                        <br />
                        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
                        <br />
                        <br />
                        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
                    </Box>
                </>
            ) : null}
            {err ? (
                <>
                    <div className='flex justify-center'>
                        <Image
                            src='/images/access_denied.svg'
                            alt='error'
                            width={250}
                            height={250}
                            loading='lazy'
                        />
                    </div>
                    <br />
                    <div className='flex justify-center'>
                        <h2 className='font-medium'>{err}</h2>
                    </div>
                    <div className='flex justify-center'>
                        <button className="btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary mt-4">
                            <Link href={"/"}>{t('home')}</Link>
                        </button>
                    </div>
                </>
            ) : err === t('internal_server_error') ? (
                <>
                    <div className='flex justify-center'>
                        <Image
                            src='/images/server_down.svg'
                            alt='error'
                            width={250}
                            height={250}
                            loading='lazy'
                        />
                    </div>
                    <br />
                    <div className='flex justify-center'>
                        <h2 className='font-medium'>{err}</h2>
                    </div>
                    <div className='flex justify-center'>
                        <button className="btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary mt-4">
                            <Link href="/">{t('home')}</Link>
                        </button>
                    </div>
                </>
            ) : isLoaded === false ? (
                <>
                    <Box padding='6' boxShadow='lg'>
                        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='3' />
                        <br />
                        <br />
                        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
                        <br />
                        <br />
                        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
                    </Box>
                </>
            ) : null}
        </>
    );
}