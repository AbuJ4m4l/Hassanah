"use client";
import { applyActionCode } from "firebase/auth";
import { useTranslations } from "next-intl";
import { auth } from "../../../../lib/firebase";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import nextImage from "next/image";

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
        setMessage(t("unknownError"));
      }
    };
    verifyEmail();
  }, [actionCode, t, setVerified, setMessage]);

  return (
    <>
      {verified === true ? (
        <>
          <div className="flex justify-center">
            <Image
              as={nextImage}
              width={250}
              height={250}
              alt="Verified"
              src="/images/svg/verified.svg"
              loading="lazy"
            />
          </div>
          <div className="flex justify-center mt-6">
            <h2>{t("email_verified_successfully")}</h2>
          </div>
        </>
      ) : verified === false ? (
        <>
          <div className="flex justify-center">
            <Image
              as={nextImage}
              width={250}
              height={250}
              alt="Verified"
              src="/images/svg/access_denied.svg"
              loading="lazy"
            />
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
