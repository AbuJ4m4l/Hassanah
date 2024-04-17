"use client";

import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

const AccessDeniedModal = ({ isOpen, onOpenChange }) => {
  const t = useTranslations("AccessDeniedModal");
  const [user] = useAuthState(auth);
  const [codeSent, setCodeSent] = useState(false);
  return (
    <Modal
      isDismissable={false}
      hideCloseButton={true}
      backdrop="blur"
      isKeyboardDismissDisabled={true}
      className="rtl:ltr"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("title")}
            </ModalHeader>
            <ModalBody>{t("messages.account_not_verified")}</ModalBody>
            <ModalFooter>
              <Button
                href="/signout"
                as={Link}
                color="danger"
              >
                {t("signout")}
              </Button>
              <Button
                color={codeSent === true ? "success" : "warning"}
                onClick={() => {
                  sendEmailVerification(user);
                  setCodeSent(true);
                }}
                variant="light"
                isDisabled={codeSent}
              >
                {codeSent === true
                  ? t("code_sent")
                  : t("resend_verification_email")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AccessDeniedModal;
