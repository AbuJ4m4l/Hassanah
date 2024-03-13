"use client"
import { useTranslations } from "next-intl"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from "@nextui-org/react";

const LoginButton = ({ LoginButtonClassName, AvatarClassName, variant }) => {
    const t = useTranslations('navbar');
    const [user] = useAuthState(auth);
    return (
        <>
            {
                user?.email ? (
                    <>
                        <Dropdown className={AvatarClassName ?? AvatarClassName} placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="primary"
                                    name={user?.displayName}
                                    size="md"
                                    src={user?.photoURL}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">{t('signedin_as')}</p>
                                    <p className="font-semibold">{user?.displayName}</p>
                                </DropdownItem>
                                <DropdownItem key="reciters" href='/dashboard' color='foreground'>
                                    {t('dashboard')}
                                </DropdownItem>
                                <DropdownItem as={Link} href="/signout" key="signout" color="danger">
                                    {t('signout')}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                ) : (
                    <Button className={LoginButtonClassName} variant={variant ?? variant} as={Link} href="/login" color="primary">
                        {t('login')}
                    </Button>
                )
            }
        </>
    );
}

export default LoginButton;