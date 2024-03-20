"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  Input,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";

function PasswordVerificationModal({
  isOpen,
  onOpenChange,
  password,
  setPassword,
}) {
  const t = useTranslations("PasswordVerificationModal");
  return (
    <>
      <Modal
        className="rtl:ltr"
        isDismissable={false}
        hideCloseButton={true}
        backdrop="blur"
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("title")}
              </ModalHeader>
              <ModalBody>
                <p>{t("body")}</p>
                <Input
                  color="primary"
                  variant="flat"
                  label={t("enterYourPassword")}
                  placeholder={t("enterYourPasswordToverifiYourIdentify")}
                  autoComplete="current-password"
                  value={password}
                  onValueChange={setPassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("close")}
                </Button>
                <Button
                  color="primary"
                  as={Link}
                  href="/login"
                  onPress={onClose}
                >
                  {t("login")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default PasswordVerificationModal;
