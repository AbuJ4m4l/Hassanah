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

const AccessDeniedModal = ({ isOpen, onOpenChange }) => {
  const t = useTranslations("AccessDeniedModal");
  const [user] = useAuthState(auth);
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
                className="!text-white"
                color="danger"
              >
                {t("signout")}
              </Button>
              <Button
                color="warning"
                variant="light"
                onClick={() => {
                  sendEmailVerification(user);
                }}
              >
                {t("resend_verification_email")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AccessDeniedModal;
