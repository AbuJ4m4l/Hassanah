"use client"
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GoogleLogin = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const router = useRouter();
    return (
        <button type="button" onClick={() => { signInWithGoogle().then(() => { router.push('/dashboard') }) }} className="flex rtl:ml-2 ltr:mr-2 justify-center w-[50%] hover:bg-secondry bg-secondry-light cursor-pointer px-4 py-2 border gap-2 border-slate-600 rounded-lg text-white hover:border-slate-900 hover:shadow transition duration-150">
            <Image
                className="w-6 h-6"
                width={6}
                height={6} src="/images/google.svg"
                loading="lazy"
                alt="Google logo"
            />
        </button>
    )
};

export default GoogleLogin;