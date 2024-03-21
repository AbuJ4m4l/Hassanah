"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import ChangeAccountDetailsForm from "../../form/ChangeAccountDetails";
import { auth } from "../../../../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChangeAccountDetailsClientPage = ({ locale }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading === false) {
      if (!user?.email) {
        router.push("/signup");
      }
    }
  });
  return (
    <ChangeAccountDetailsForm
      locale={locale}
      className="flex flex-col mt-10 mx-auto items-center w-[340px]"
    />
  );
};

export default ChangeAccountDetailsClientPage;
