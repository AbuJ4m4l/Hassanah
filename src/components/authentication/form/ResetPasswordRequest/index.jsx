"use client";

import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { auth } from "../../../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import SuccessModal from "./SuccessModal";

const SendResetPasswordEmailClientComponent = ({ locale, className, emailFromQuery }) => {
    const [email, setEmail] = useState(emailFromQuery ?? emailFromQuery);
    const t = useTranslations('resetPassword');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleForm = (e) => {
        try {
            e.preventDefault();
            if (email) {
                sendPasswordResetEmail(auth, email).then(data => {
                    onOpen();
                })
                    .catch(() => {
                        onOpen();
                    })
            }
        } catch (error) {
            onOpen();
            console.error(error);
        }
    }
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
                <Button type="submit" color="primary" onClick={handleForm}>{t('sendResetPasswordVerification')}</Button>
            </form>
            <SuccessModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    )
}

export default SendResetPasswordEmailClientComponent