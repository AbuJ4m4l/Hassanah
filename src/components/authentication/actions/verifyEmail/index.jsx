"use client";
import { applyActionCode } from "firebase/auth";
import { useTranslations } from "next-intl";
import { auth } from "../../../../lib/firebase";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ErrorModal from "../ErrorModal";

const VerifyEmailComponent = ({ actionCode, continueUrl }) => {
  const t = useTranslations("VerifyEmailComponent");

  const [message, setMessage] = useState("");
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onOpenChange: onSuccessModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isErrorModalOpen,
    onOpen: onErrorModalOpen,
    onOpenChange: onErrorModalOpenChange,
  } = useDisclosure();
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
  }, [
    actionCode,
    continueUrl,
    t,
    setMessage,
    onErrorModalOpen,
    onSuccessModalOpen,
  ]);

  return (
    <>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onOpenChange={onErrorModalOpenChange}
        message={message}
      />
    </>
  );
};

export default VerifyEmailComponent;
