"use client";

import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { auth } from "../../../../lib/firebase";
import SuccessModal from "./SuccessModal";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import PasswordVerificationModal from "./PasswordVerificationModal";

const ChangeAccountDetailsForm = ({ locale, className }) => {
  const t = useTranslations("changeAccountDetails");
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onOpenChange: onSuccessModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isPasswordVerificationModalOpen,
    onOpen: onPasswordVerificationModalOpen,
    onOpenChange: onPasswordVerificationModalOpenChange,
  } = useDisclosure();
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState(loading === false ?? user?.email);
  const [password, setPassword] = useState("");
  const handleForm = (e) => {
    try {
      e.preventDefault();
      if (email && password) {
        signInWithEmailAndPassword(email, password)
          .then((data) => {})
          .catch(() => {});
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={className}>
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
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onOpenChange={onSuccessModalOpenChange}
      />
      <PasswordVerificationModal
        password={password}
        setPassword={setPassword}
        isOpen={isPasswordVerificationModalOpen}
        onOpenChange={onPasswordVerificationModalOpenChange}
      />
    </div>
  );
};

export default ChangeAccountDetailsForm;
