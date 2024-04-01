"use client";
import { applyActionCode } from "firebase/auth";
import { useTranslations } from "next-intl";
import { auth } from "../../../../lib/firebase";

const VerifyEmailComponent = ({ actionCode, continueUrl }) => {
  const t = useTranslations("VerifyEmailComponent");
  useEffect(() => {
    const verifyEmail = () => {
      try {
        if (actionCode && continueUrl) {
          applyActionCode(auth, actionCode)
            .then(() => {})
            .catch((error) => {
              onErrorModalOpen();
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
  }, [actionCode, continueUrl]);

  return <></>;
};

export default VerifyEmailComponent;
