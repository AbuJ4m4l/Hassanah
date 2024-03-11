"use client"
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const GoogleLogin = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const router = useRouter();
    return (
        <Button color="default" variant="solid" type="button" onClick={() => { signInWithGoogle().then(() => { router.push('/dashboard') }) }} className="flex rtl:mr-2 ltr:ml-2 justify-center w-[50%] cursor-pointer px-4 py-2 gap-2 rounded-lg">
            <Image
                className="w-6 h-6"
                width={6}
                height={6} src="/images/svg/google.svg"
                loading="lazy"
                alt="Google logo"
            />
        </Button>
    )
};

export default GoogleLogin;