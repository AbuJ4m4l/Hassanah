"use client";

import Image from "next/image";
import { useSignInWithFacebook } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

const FacebookLogin = () => {
    const [signInWithFacebook] = useSignInWithFacebook(auth);
    const router = useRouter();
    return (
        <button type="button" onClick={() => { signInWithFacebook().then(() => { router.push('/dashboard') }) }} className="flex rtl:mr-2 ltr:ml-2 justify-center w-[50%] hover:bg-secondry bg-secondry-light cursor-pointer px-4 py-2 border gap-2 border-slate-600 rounded-lg text-white hover:border-slate-900 hover:shadow transition duration-150">
            <Image
                className="w-6 h-6"
                width={6}
                height={6} src="/images/facebook.svg"
                loading="lazy"
                alt="Facebook logo"
            />
        </button>
    )
};

export default FacebookLogin;