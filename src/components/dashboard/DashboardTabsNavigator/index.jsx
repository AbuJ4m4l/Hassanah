"use client";
import { Tabs, Tab } from "@nextui-org/react";
import MyAccount from "../MyAccount";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Activity from "../activity";
import Playlists from "../playlists";
import Settings from "../settings";
import { auth } from "../../../lib/firebase";

const DashboardTabsNavigator = ({ locale }) => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const t = useTranslations("dashboard");
    useEffect(() => {
        if (loading === false) {
            if (!user?.email) {
                router.push("/signup");
            }
        }
    });
    const [selected, setSelected] = useState(t("myAccount"));
    return (
        <>
            <div className="flex w-full flex-col">
                <Tabs
                    radius="full"
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
    );
};

export default DashboardTabsNavigator;
