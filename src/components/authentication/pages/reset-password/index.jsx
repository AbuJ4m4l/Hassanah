"use client";
import { NextSeo } from "next-seo";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import SendResetPasswordEmailClientComponent from "../../form/ResetPasswordRequest";
import { useTranslations } from "next-intl";

const ResetPasswordClientComponent = ({ locale }) => {
  const params = useSearchParams();
  const { theme } = useTheme();
  const t = useTranslations("resetPassword");
  return (
    <>
      <NextSeo
        title={t("metadata.title")}
        description={t("metadata.description")}
        themeColor={theme}
      />
      <div className="flex justify-center">
        <h1 className="text-xl md:text-2xl">{t("resetPassword")}</h1>
      </div>
      <SendResetPasswordEmailClientComponent
        emailFromQuery={params.get("email") ? params.get("email") : ""}
        locale={locale}
        className="flex flex-col mt-10 mx-auto items-center w-[340px]"
      />
    </>
  );
};

export default ResetPasswordClientComponent;
