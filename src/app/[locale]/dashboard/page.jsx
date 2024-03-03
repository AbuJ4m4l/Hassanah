"use client"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { faClockRotateLeft, faGear, faMobileScreen, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyAccount from '../../../components/profile.MyAccount';
import { useRouter } from 'next/navigation';
import Security from '../../../components/profile.Security';

const ProfileNvabar = () => {
    const router = useRouter();
    return (
        <>
            <Tabs variant='unstyled' align='center' className='-mt-[40px]'>
                <TabList bgColor="#242424" height="60px" className="overflow-x-auto overflow-y-hidden w-full">
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faUser} className='ltr:mr-2 rtl:ml-2' />My Account</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faShield} className='ltr:mr-2 rtl:ml-2' />Security</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faMobileScreen} className='ltr:mr-2 rtl:ml-2' />Devices</Tab>
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
                    <TabPanel>

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}

export default ProfileNvabar;
