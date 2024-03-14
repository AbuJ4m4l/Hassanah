"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const CreateNewPlaylistModal = ({ isOpen, onOpenChange }) => {
  const t = useTranslations('createNewPlaylistModal');
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{t('title')}</ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {t('cancel')}
              </Button>
              <Button color="primary" onPress={onClose}>
                {t('create')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateNewPlaylistModal;