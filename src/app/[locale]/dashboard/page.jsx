"use client"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { faClockRotateLeft, faGear, faMobileScreen, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyAccount from '../../../components/dashboard/MyAccount';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Activity from '../../../components/dashboard/activity';

const ProfileNvabar = ({ params: { locale } }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const t = useTranslations('dashboard');
    useEffect(() => {
        if (!user) {
            router.push("/signup")
        }
    }, [user, router])
    return (
        <>
            <Tabs variant='unstyled' align='center' className='-mt-[40px]'>
                <TabList bgColor="#242424" height="60px" className="overflow-x-auto overflow-y-hidden w-full">
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faUser} className='ltr:mr-2 rtl:ml-2' />{t('myAccount')}</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faClockRotateLeft} className='ltr:mr-2 rtl:ml-2' />{t('activity')}</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faGear} className='ltr:mr-2 rtl:ml-2' />{t('settings')}</Tab>
                </TabList>
                <TabPanels className='mt-[40px]'>
                    <TabPanel>
                        <MyAccount />
                    </TabPanel>
                    <TabPanel>
                        <Activity locale={locale} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}

export default ProfileNvabar;
