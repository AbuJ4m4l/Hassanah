"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const EditPlaylistModal = ({ isOpen, onOpenChange, Playlist }) => {
  const t = useTranslations("editPlaylistModal");
  const editPlaylist = () => {};
  const [playlistName, setPlaylistName] = useState(Playlist?.name);
  const [visibility, setVisibility] = useState(Playlist?.visibility);
  return (
    <Modal className="rtl:ltr" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("title", {
                name: Playlist?.name,
              })}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={editPlaylist}>
                <Input
                  isRequired
                  type="text"
                  name="playlist_name"
                  variant="filled"
                  label={t("playlist_name")}
                  placeholder={t("enter_playlist_name")}
                  value={playlistName}
                  onValueChange={setPlaylistName}
                />
                <Select
                  isRequired
                  label={t("visibility")}
                  placeholder={t("select_visibility")}
                  className="mt-4"
                  value={visibility}
                  onChange={(e) => setVisibility(e?.target?.value)}
                >
                  <SelectItem
                    color="success"
                    className="!text-white"
                    value="public"
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-eye"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    }
                  >
                    {t("public")}
                  </SelectItem>
                  <SelectItem
                    color="danger"
                    value="private"
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-lock"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    }
                  >
                    {t("private")}
                  </SelectItem>
                </Select>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                type="button"
                variant="light"
                onPress={onClose}
              >
                {t("cancel")}
              </Button>
              <Button
                color="primary"
                type="submit"
                onClick={editPlaylist}
                onPress={onClose}
              >
                {t("save")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditPlaylistModal;
