"use client";

import Image from "next/image";
import { useSignInWithFacebook } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const FacebookLogin = () => {
    const [signInWithFacebook] = useSignInWithFacebook(auth);
    const router = useRouter();
    return (
        <Button color="default" variant="solid" type="button" onClick={() => {
            signInWithFacebook().then(data => {
                sessionStorage.removeItem('user')
                sessionStorage.setItem('user', JSON.stringify(data?.user))
                router.push('/dashboard')
            })
        }} className="rtl:mr-2 ltr:ml-2 min-w-[50%] cursor-pointer">
            <Image
                className="w-6 h-6"
                width={6}
                height={6} src="/images/svg/facebook.svg"
                loading="lazy"
                alt="Facebook logo"
            />
        </Button>
    )
};

export default FacebookLogin;