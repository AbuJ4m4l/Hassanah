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

const SignoutModal = ({ isOpen, onOpenChange }) => {
  const t = useTranslations("SignoutModal");
  return (
    <Modal className="rtl:ltr" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("title")}
            </ModalHeader>
            <ModalBody>
              {t("attention")}
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                {t("cancel")}
              </Button>
              <Button href="/signout" as={Link} className="!text-white" color="danger">
                {t("signout")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SignoutModal;
