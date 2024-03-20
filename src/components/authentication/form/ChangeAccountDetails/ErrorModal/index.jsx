"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
function ErrorModal({ isOpen, onOpenChange }) {
  const t = useTranslations("ChangeAccountDetailsErrorModal");
  return (
    <>
      <Modal className="rtl:ltr" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("title")}
              </ModalHeader>
              <ModalBody>
                <p>{t("body")}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("close")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ErrorModal;
