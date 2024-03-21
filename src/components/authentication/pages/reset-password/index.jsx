"use client";

import { useSearchParams } from "next/navigation";
import SendResetPasswordEmailClientComponent from "../../form/ResetPasswordRequest";
import { useTranslations } from "next-intl";

const ResetPasswordClientComponent = ({ locale }) => {
  const params = useSearchParams();
  const t = useTranslations("resetPassword");
  return (
    <>
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
