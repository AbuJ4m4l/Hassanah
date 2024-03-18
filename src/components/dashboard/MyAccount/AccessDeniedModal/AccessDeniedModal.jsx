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

const AccessDeniedModal = ({ isOpen, onOpenChange }) => {
  const t = useTranslations("AccessDeniedModal");
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
            <ModalBody>{t("attention")}</ModalBody>
            <ModalFooter>
              <Button
                href="/signout"
                as={Link}
                className="!text-white"
                color="danger"
              >
                {t("signout")}
              </Button>
              <Button color="warning" variant="light">
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
