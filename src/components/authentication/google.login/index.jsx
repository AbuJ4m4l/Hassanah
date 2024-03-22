"use client";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const GoogleLogin = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const router = useRouter();
  return (
    <Button
      color="default"
      variant="solid"
      type="button"
      onClick={() => {
        signInWithGoogle().then(async (userCredential) => {
          const body = {
            provider: "google.com",
            id: userCredential?.user?.uid,
            email: userCredential?.user?.email,
            username: userCredential?.user?.displayName,
            photoURL: userCredential?.user?.photoURL,
            emailVerified: userCredential?.user?.emailVerified,
          };
          const response = await fetch(
            "http://38.242.214.31:3002/api/v1/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          const data = await response.json();
          if (data) {
            if (response.ok) {
              localStorage?.setItem("token", data?.token);
              sessionStorage?.setItem("user", JSON.stringify(data?.user));
              router.push("/dashboard");
            }
          }
        });
      }}
      className="rtl:mr-2 ltr:ml-2 min-w-[50%] cursor-pointer"
    >
      <Image
        className="w-6 h-6"
        width={6}
        height={6}
        src="/images/svg/google.svg"
        loading="lazy"
        alt="Google logo"
      />
    </Button>
  );
};

export default GoogleLogin;
