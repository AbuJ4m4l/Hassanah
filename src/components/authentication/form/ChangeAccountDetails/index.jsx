"use client";

import { Button, Input, Skeleton, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { auth } from "../../../../lib/firebase";
import SuccessModal from "./SuccessModal";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useUpdateEmail,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import Link from "next/link";
import ErrorModal from "./ErrorModal";

const ChangeAccountDetailsForm = ({ locale, className }) => {
  const t = useTranslations("changeAccountDetails");
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
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [signInWithEmailAndPassword, _user, SignInLoading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user, loading] = useAuthState(auth);
  const [updateEmail, updateEmailLoading, updateEmailError] =
    useUpdateEmail(auth);
  const [updateProfile, updateProfileLoading, updateProfileError] =
    useUpdateProfile(auth);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(
    JSON.parse(sessionStorage.getItem("user"))?.email
  );
  const [username, setUsername] = useState(
    JSON.parse(sessionStorage.getItem("user"))?.displayName
  );
  const [password, setPassword] = useState("");
  const [updatedData, setUpdataData] = useState({
    email: false,
    username: false,
  });
  const isPasswordInvalid = useMemo(() => {
    if (password === "") return true;
    return false;
  }, [password]);
  const handleVerificationPasswordForm = (e) => {
    try {
      e.preventDefault();
      if (email && password) {
        signInWithEmailAndPassword(email, password).then((data) => {
          if (error?.code) {
            setIsAccessGranted(false);
          } else {
            if (data?.user?.email) {
              setIsAccessGranted(true);
            }
          }
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
      updateEmail(email).then(() => {
        onSuccessModalOpen();
        sessionStorage?.setItem("user", JSON.stringify(user));
      });
      updateProfile({
        displayName: username,
      }).then(() => {
        onSuccessModalOpen();
        sessionStorage?.setItem("user", JSON.stringify(user));
      });
      setUpdataData({
        email: updateEmailError?.code ? false : true,
        username: updateProfileError?.code ? false : true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={className}>
        {SignInLoading === false ? (
          isAccessGranted === true ? (
            <>
              <form onSubmit={handleForm} className="space-y-6">
                <h2 className="mt-4">{t("email")}:</h2>
                <Skeleton
                  isLoaded={loading === false ? true : false}
                  className="rounded-lg mt-2"
                >
                  <Input
                    isClearable
                    isRequired
                    className="truncate"
                    name="email"
                    label={t("email")}
                    value={email}
                    onValueChange={setEmail}
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
                </Skeleton>

                <h2 className="mt-4">{t("username")}:</h2>
                <Skeleton
                  isLoaded={loading === false ? true : false}
                  className="rounded-lg mt-2"
                >
                  <Input
                    isClearable
                    isRequired
                    className="truncate mt-2"
                    name="username"
                    label={t("username")}
                    value={username}
                    onValueChange={setUsername}
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    }
                  />
                </Skeleton>
                <Button type="submit" color="primary" onClick={handleForm}>
                  {t("sendResetPasswordVerification")}
                </Button>
              </form>
            </>
          ) : locale === "ar" ? (
            <form
              className="w-[300px] md:w-[400px]"
              onSubmit={handleVerificationPasswordForm}
            >
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
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
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
              <div className="mt-6 flex justify-center">
                <p>
                  {t("forget_password")}
                  <Link href="/reset-password" className="text-primary">
                    {t("reset_password")}
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form
              className="w-[300px] md:w-[400px]"
              onSubmit={handleVerificationPasswordForm}
            >
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
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
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
              <div className="mt-6 flex justify-center">
                <p>
                  {t("forget_password")}
                  <Link href="/reset-password" className="text-primary">
                    {t("reset_password")}
                  </Link>
                </p>
              </div>
            </form>
          )
        ) : (
          "Loading..."
        )}
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onOpenChange={onSuccessModalOpenChange}
      />
    </>
  );
};

export default ChangeAccountDetailsForm;
