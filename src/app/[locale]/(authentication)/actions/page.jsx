"use client";
import { useSearchParams } from "next/navigation";
import ResetPasswordComponent from "../../../../components/authentication/actions/resetPassword";

const Actions = () => {
  const query = useSearchParams();
  const mode = query?.get("mode");
  const continueUrl = query?.get("continueUrl");
  const obbCode = query?.get("obbCode");
  return (
    <>
      {obbCode && mode && continueUrl && mode === "resetPassword" ? (
        <ResetPasswordComponent
          continueUrl={continueUrl}
          actionCode={obbCode}
        />
      ) : mode === "verifyEmail" ? (
        <></>
      ) : (
        <></>
      )}
    </>
  );
};

export default Actions;
