"use client";
import { useSearchParams } from "next/navigation";
import ResetPasswordComponent from "../../../../components/authentication/actions/resetPassword";
import VerifyEmailComponent from "../../../../components/authentication/actions/verifyEmail";

const Actions = () => {
  const query = useSearchParams();
  const mode = query?.get("mode");
  const continueUrl = query?.get("continueUrl");
  const obbCode = query?.get("obbCode");
  return (
    <>
      {obbCode && mode && mode === "resetPassword" ? (
        <ResetPasswordComponent
          continueUrl={continueUrl ? continueUrl : "/login"}
          actionCode={obbCode}
        />
      ) : mode === "verifyEmail" ? (
        <VerifyEmailComponent
          continueUrl={continueUrl ? continueUrl : ""}
          actionCode={obbCode}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Actions;
