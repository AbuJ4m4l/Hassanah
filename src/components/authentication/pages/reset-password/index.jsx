"use client";

import { useSearchParams } from "next/navigation";
import SendResetPasswordEmailClientComponent from "../../form/ResetPasswordRequest";

const ResetPasswordClientComponent = ({ locale }) => {
    const params = useSearchParams();
    return (
        <>
            <SendResetPasswordEmailClientComponent emailFromQuery={params.get('email') ? params.get('email') : ""} locale={locale} className="flex flex-col mx-auto items-center w-[340px]" />
        </>
    )
}

export default ResetPasswordClientComponent;