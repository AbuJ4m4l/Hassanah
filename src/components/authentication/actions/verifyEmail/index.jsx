"use client";
import { applyActionCode } from "firebase/auth";
import { useTranslations } from "next-intl";
import { auth } from "../../../../lib/firebase";
import { useState } from "react";

const VerifyEmailComponent = ({ actionCode, continueUrl }) => {
  const t = useTranslations("VerifyEmailComponent");

  const [message, setMessage] = useState("");
  useEffect(() => {
    const verifyEmail = () => {
      try {
        if (actionCode && continueUrl) {
          applyActionCode(auth, actionCode)
            .then(() => {})
            .catch((error) => {
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
        console.error(error);
      }
    };
    verifyEmail();
  }, [actionCode, continueUrl, t, setMessage]);

  return <></>;
};

export default VerifyEmailComponent;
