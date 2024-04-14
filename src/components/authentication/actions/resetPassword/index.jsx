"use client";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  checkActionCode,
} from "firebase/auth";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { auth } from "../../../../lib/firebase";
import { useRouter } from "next/navigation";
import SuccessModal from "./SuccessModal";
import ErrorModal from "../ErrorModal";

const ResetPasswordComponent = ({ actionCode, continueUrl }) => {
  const t = useTranslations("ResetPasswordComponent");
  const [value, setValue] = useState("");
  const router = useRouter();
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
  const [confirmValue, setConfirmValue] = useState("");
  const handleForm = (e) => {
    try {
      e.preventDefault();
      if (value && confirmValue && value === confirmValue) {
        verifyPasswordResetCode(auth, actionCode)
          .then(async () => {
            const response = await fetch(
              "http://38.242.214.31:3002/api/v1/reset-password",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  oobCode: actionCode,
                  password: value,
                }),
              }
            );
            const data = await response?.json();
            console.log(data);
            if (data.error) {
              setMessage(t("unknownError"));
              onErrorModalOpen();
            } else {
              confirmPasswordReset(auth, actionCode, value)
                .then(async () => {
                  onSuccessModalOpen();
                  setTimeout(() => {
                    router.push(continueUrl);
                  }, 2000);
                })
                .catch((err) => {
                  setMessage(t("unknownError"));
                  onErrorModalOpen();
                });
            }
          })
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
      setMessage(t("unknownError"));
    }
  };
  const validatePassword = (password) =>
    password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W|_)(?=.{7,})/);
  const isPasswordInvalid = useMemo(() => {
    if (value === "") return true;
    const isValid = validatePassword(value) ? false : 1;
    return isValid;
  }, [value]);
  const isMatchPasswordInvalid = useMemo(() => {
    if (confirmValue && value !== confirmValue) return 0;
    if (confirmValue && value === confirmValue) return false;
    return true;
  }, [value, confirmValue]);
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="my-4 text-xl">{t("change_password")}</h1>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleForm}
          className="w-[300px] md:w-[400px] space-y-6"
        >
          <Input
            value={value}
            type="password"
            isInvalid={isPasswordInvalid}
            onValueChange={setValue}
            name="password"
            label={t("input.label")}
            placeholder={t("input.placeholder")}
            isRequired
            errorMessage={
              isPasswordInvalid === true
                ? t("password_required")
                : isPasswordInvalid === 1 &&
                  t("the_password_should_contains_special_charachters")
            }
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-lock"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            }
          />
          <Input
            value={confirmValue}
            type="password"
            onValueChange={setConfirmValue}
            name="confirmPassword"
            label={t("input.MatchLabel")}
            placeholder={t("input.MatchPlaceholder")}
            isRequired
            isInvalid={isMatchPasswordInvalid}
            errorMessage={
              isMatchPasswordInvalid === true
                ? t("password_match_required")
                : isMatchPasswordInvalid === 0 &&
                  t("match_password_doesnt_match")
            }
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-lock"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            }
          />
          <Button fullWidth onClick={handleForm} type="submit" color="primary">
            {t("resetPassword")}
          </Button>
        </form>
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onOpenChange={onSuccessModalOpenChange}
        />
        <ErrorModal
          isOpen={isErrorModalOpen}
          onOpenChange={onErrorModalOpenChange}
          message={message}
        />
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
