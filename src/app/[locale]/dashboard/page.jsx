"use client"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { faClockRotateLeft, faGear, faMobileScreen, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyAccount from '../../../components/dashboard/profile.MyAccount';
import { useRouter } from 'next/navigation';
import Security from '../../../components/dashboard/profile.Security';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { useEffect } from 'react';

const ProfileNvabar = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!user) {
            router.push("/signup")
        }
    }, [user, router])
    return (
        <>
            <Tabs variant='unstyled' align='center' className='-mt-[40px]'>
                <TabList bgColor="#242424" height="60px" className="overflow-x-auto overflow-y-hidden w-full">
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faUser} className='ltr:mr-2 rtl:ml-2' />My Account</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faShield} className='ltr:mr-2 rtl:ml-2' />Security</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faClockRotateLeft} className='ltr:mr-2 rtl:ml-2' />Activity</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faGear} className='ltr:mr-2 rtl:ml-2' />Settings</Tab>
                </TabList>
                <TabPanels className='mt-[40px]'>
                    <TabPanel>
                        <MyAccount />
                    </TabPanel>
                    <TabPanel>
                        <Security />
                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}

export default ProfileNvabar;
