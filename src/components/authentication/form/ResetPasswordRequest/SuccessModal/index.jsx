import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Link } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import React from 'react'

function SuccessModal({ isOpen, onOpenChange }) {
    const t = useTranslations('SuccessModal')
    return (
        <>
            <Modal className="rtl:ltr" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t('title')}</ModalHeader>
                            <ModalBody>
                                <p>
                                    {t('body')}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    {t('close')}
                                </Button>
                                <Button color="primary" as={Link} href="/login" onPress={onClose}>
                                    {t('login')}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default SuccessModal