import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { faClockRotateLeft, faMobileScreen, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyAccount from '../../../components/profile.MyAccount';

const ProfileNvabar = () => {
    return (
        <>
            <Tabs variant='unstyled' align='center'>
                <TabList bgColor="#242424" height="60px" className="overflow-x-auto overflow-y-hidden ">
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faUser} className='mr-2' />My Account</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faShield} className='mr-2' />Security</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faMobileScreen} className='mr-2' />Devices</Tab>
                    <Tab _selected={{ color: 'white', bg: '#343434' }} _hover={{ color: 'white', bg: '#343434' }}><FontAwesomeIcon icon={faClockRotateLeft} className='mr-2' />Activity</Tab>
                </TabList>
                <TabPanels className='mt-[40px]'>
                    <TabPanel>
                        <MyAccount />
                    </TabPanel>
                    <TabPanel>

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
