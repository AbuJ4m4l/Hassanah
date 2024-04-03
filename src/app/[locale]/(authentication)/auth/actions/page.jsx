"use client";
import { notFound, useSearchParams } from "next/navigation";
import ResetPasswordComponent from "../../../../../components/authentication/actions/resetPassword";
import VerifyEmailComponent from "../../../../../components/authentication/actions/verifyEmail";

const Actions = () => {
  const query = useSearchParams();
  const mode = query?.get("mode");
  const continueUrl = query?.get("continueUrl");
  const oobCode = query?.get("oobCode");
  return (
    <>
      {mode === "resetPassword" ? (
        <ResetPasswordComponent
          continueUrl={continueUrl ? continueUrl : "/login"}
          actionCode={oobCode}
        />
      ) : mode === "verifyEmail" ? (
        <VerifyEmailComponent
          continueUrl={continueUrl ? continueUrl : ""}
          actionCode={oobCode}
        />
      ) : (
        notFound()
      )}
    </>
  );
};

export default Actions;
