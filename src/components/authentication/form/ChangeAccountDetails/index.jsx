"use client";

import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { auth } from "../../../../lib/firebase";
import SuccessModal from "./SuccessModal";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

const ChangeAccountDetailsForm = ({ locale, className }) => {
  const t = useTranslations("changeAccountDetails");
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onOpenChange: onSuccessModalOpenChange,
  } = useDisclosure();
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [signInWithEmailAndPassword, _user, SignInLoading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user, loading] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const isPasswordInvalid = useMemo(() => {
    if (password === "") return true;
    return false;
  }, [password]);
  const handleVerificationPasswordForm = (e) => {
    try {
      e.preventDefault();
      if (email && password) {
        signInWithEmailAndPassword(email, password)
          .then((data) => {
            if (error) {
              setIsAccessGranted(false);
            }
            setIsAccessGranted(true);
          })
          .catch(() => {
            setIsAccessGranted(false);
          });
      }
    } catch (error) {
      setIsAccessGranted(false);
      console.error(error);
    }
  };
  const handleForm = (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={className}>
      {isAccessGranted === true ? (
        <>
          <form onSubmit={handleForm} className="space-y-6">
            {locale === "ar" ? (
              <>
                <Input
                  isClearable
                  isRequired
                  type="email"
                  name="email"
                  label={t("email")}
                  placeholder={t("enter_your_email")}
                  value={email}
                  autoComplete="email"
                  onClear={() => setEmail("")}
                  onValueChange={setEmail}
                  endContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  }
                />
              </>
            ) : (
              <>
                <Input
                  isRequired
                  isClearable
                  type="email"
                  name="email"
                  label={t("email")}
                  placeholder={t("enter_your_email")}
                  value={email}
                  autoComplete="email"
                  onClear={() => setEmail("")}
                  onValueChange={setEmail}
                  startContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  }
                />
              </>
            )}
            <Button type="submit" color="primary" onClick={handleForm}>
              {t("sendResetPasswordVerification")}
            </Button>
          </form>
        </>
      ) : locale === "ar" ? (
        <form onSubmit={handleVerificationPasswordForm}>
          <Input
            isRequired
            name="password"
            label={t("password")}
            placeholder={t("enter_your_password")}
            value={password}
            isInvalid={isPasswordInvalid}
            color={isPasswordInvalid ? "danger" : "default"}
            errorMessage={isPasswordInvalid && t("password_wrong")}
            onValueChange={setPassword}
            autoComplete="current-password"
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-lock"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            }
            startContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye-off"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            }
            type={showPassword ? "text" : "password"}
          />
          <Button
            className="mt-6"
            color="primary"
            onClick={handleVerificationPasswordForm}
          >
            {t("verify_password")}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerificationPasswordForm}>
          <Input
            isRequired
            name="password"
            label={t("password")}
            placeholder={t("enter_your_password")}
            value={password}
            isInvalid={isPasswordInvalid}
            color={isPasswordInvalid ? "danger" : "default"}
            errorMessage={isPasswordInvalid && t("password_wrong")}
            onValueChange={setPassword}
            autoComplete="current-password"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-lock"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye-off"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            }
            type={showPassword ? "text" : "password"}
          />
          <Button
            className="mt-6"
            color="primary"
            onClick={handleVerificationPasswordForm}
          >
            {t("verify_password")}
          </Button>
        </form>
      )}

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onOpenChange={onSuccessModalOpenChange}
      />
    </div>
  );
};

export default ChangeAccountDetailsForm;
