"use client";
import { applyActionCode } from "firebase/auth";
import { useTranslations } from "next-intl";
import { auth } from "../../../../lib/firebase";
import { useEffect, useState } from "react";

const VerifyEmailComponent = ({ actionCode }) => {
  const t = useTranslations("VerifyEmailComponent");
  const [verified, setVerified] = useState();
  const [message, setMessage] = useState("");
  useEffect(() => {
    const verifyEmail = () => {
      try {
        if (actionCode) {
          applyActionCode(auth, actionCode)
            .then(() => {
              setVerified(true);
            })
            .catch((error) => {
              setVerified(false);
              switch (error?.code) {
                case "auth/expired-action-code":
                  setMessage(t("expiredActionCode"));
                  break;
                case "auth/invalid-action-code":
                  setMessage(t("invalidActionCode"));
                  break;
                case "auth/user-disabled":
                  setMessage(t("userDisabled"));
                  break;
                case "auth/user-not-found":
                  setMessage(t("userNotFound"));
                  break;
                case "auth/weak-password":
                  setMessage(t("weakPassword"));
                  break;
                default:
                  setMessage(t("unknownError"));
              }
            });
        }
      } catch (error) {
        setVerified(false);
        console.error(error);
      }
    };
    verifyEmail();
  }, [actionCode, t, setVerified, setMessage]);

  return (
    <>
      {verified === true ? (
        <>
          <div className="flex justify-center">
            <div className="px-16 py-16 rounded-full outline-offset-2 outline-4 outline-green-600 outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
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
            <h2>{t("email_verified_successfully")}</h2>
          </div>
        </>
      ) : verified === false ? (
        <>
          <div className="flex justify-center">
            <div className="px-16 py-16 rounded-full outline-offset-2 outline-4 outline-red-600 outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <h2>{message}</h2>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default VerifyEmailComponent;
