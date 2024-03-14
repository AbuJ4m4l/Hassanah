"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const DeletePlaylistModal = ({ isOpen, onOpenChange, Playlist }) => {
    const t = useTranslations('deletePlaylistModal');
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t('title', {
                            name: Playlist.name
                        })}</ModalHeader>
                        <ModalBody>
{t('attention', {
    name: Playlist.name
})}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                {t('cancel')}
                            </Button>
                            <Button color="danger" onPress={onClose}>
                                {t('delete')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default DeletePlaylistModal;