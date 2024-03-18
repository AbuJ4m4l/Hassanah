"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

const Signedout = () => {
  const t = useTranslations("signedout");
  const router = useRouter();
  const [Signout] = useSignOut(auth);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      Signout().then(() => {
        router.push("/signedout");
      });
    }
  }, [Signout, user, router]);
  return (
    <>
      <div className="flex justify-center">
        <div className="px-16 py-16 rounded-full outline-offset-2 outline-4 outline-green-600 outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-check"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <h2>{t("signedout_successfully")}</h2>
      </div>
    </>
  );
};

export default Signedout;
