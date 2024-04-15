"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { NextSeo } from "next-seo";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

const UserForm = ({ locale, tab }) => {
  const [selected, setSelected] = useState(tab);
  const t = useTranslations("user-form");
  const { theme } = useTheme();
  return (
    <>
      <div className="flex flex-col w-full mx-auto items-center">
        <Card className={`max-w-full w-[340px] h-auto`}>
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="User form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title={t("login")}>
                <LoginForm locale={locale} />
              </Tab>
              <Tab key="signup" title={t("signup")}>
                <SignupForm locale={locale} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default UserForm;
