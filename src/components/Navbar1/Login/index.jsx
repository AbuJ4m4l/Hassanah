"use client"

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { Avatar, ChakraProvider, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import theme from "../../../commonTheme";

const Login = () => {
    const t = useTranslations(`navbar`);
    const [user, loading] = useAuthState(auth)
    if (!loading) {
        return (
            <>
                {
                    user ? (
                        <ChakraProvider theme={theme}>
                            <Menu>
                                <MenuButton>
                                    <Avatar
                                        src={user?.photoURL}
                                        name={user?.displayName}
                                        size="sm"
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem><Link href="/dashboard">{t('dashboard')}</Link></MenuItem>
                                    <MenuItem><Link href="/signout">{t('logout')}</Link></MenuItem>
                                </MenuList>
                            </Menu>
                        </ChakraProvider>
                    ) : (
                        <button className="btn bg-white hover:bg-transparent border-2 border-white text-black hover:text-white">
                            <Link href="/login" className="text-xs">
                                {t('login')}
                            </Link>
                        </button>
                    )
                }
            </>
        )
    }
}

export default Login;