"use client";
import { Tabs, Tab, useDisclosure } from "@nextui-org/react";
import MyAccount from "../MyAccount";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Activity from "../activity";
import Playlists from "../playlists";
import Settings from "../settings";
import { auth } from "../../../lib/firebase";
import AccessDeniedModal from "../MyAccount/AccessDeniedModal/AccessDeniedModal";

const DashboardTabsNavigator = ({ locale }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const t = useTranslations("dashboard");
  const {
    isOpen: isAccessDeniedModalOpen,
    onOpen: onAccessDeniedModalOpen,
    onOpenChange: onAccessDeniedOpenChange,
    onClose: onAccessDeniedModalClose,
  } = useDisclosure();
  useEffect(() => {
    const accessGranted = async () => {
      if (loading === false) {
        if (!user?.email) {
          router.push("/signup");
          return;
        }
        if (user?.providerId === "password" && user?.emailVerified === false) {
          setIsAccessGranted(false);
          onAccessDeniedModalOpen();
        } else if (
          user?.emailVerified === true ||
          user?.providerId === "facebook.com" ||
          user?.providerId === "google.com"
        ) {
          setIsAccessGranted(true);
          onAccessDeniedModalClose();
        }
      }
    };

    accessGranted();
  }, [
    loading,
    router,
    user?.email,
    user?.providerId,
    user?.emailVerified,
    onAccessDeniedModalOpen,
    onAccessDeniedModalClose,
  ]);
  const [selected, setSelected] = useState(t("myAccount"));
  return (
    <>
      {isAccessGranted === true ? (
        <>
          <div className="flex w-full flex-col">
            <Tabs
              radius="full"
              color="primary"
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={setSelected}
              className="flex justify-center mx-4 md:mx-0"
            >
              <Tab
                key="myAccount"
                title={
                  <div className="flex items-center ltr:space-x-2">
                    <span>{t("myAccount")}</span>
                  </div>
                }
              >
                <MyAccount locale={locale} />
              </Tab>
              <Tab
                key="playlists"
                title={
                  <div className="flex items-center space-x-2">
                    <span>{t("playlists")}</span>
                  </div>
                }
              >
                <Playlists />
              </Tab>
              <Tab
                key="activity"
                title={
                  <div className="flex items-center space-x-2">
                    <span>{t("activity")}</span>
                  </div>
                }
              >
                <Activity />
              </Tab>
              <Tab
                key="settings"
                title={
                  <div className="flex items-center space-x-2">
                    <span>{t("settings")}</span>
                  </div>
                }
              >
                <Settings />
              </Tab>
            </Tabs>
          </div>
        </>
      ) : (
        <>
          <AccessDeniedModal
            isOpen={true}
            onOpenChange={onAccessDeniedOpenChange}
          />
        </>
      )}
    </>
  );
};

export default DashboardTabsNavigator;
