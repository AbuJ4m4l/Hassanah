"use client"

import { useSession } from "next-auth/react";

const Security = () => {
  const session = useSession();
  return (
    <>
      {
        session?.user?.provider
      }
    </>
  );
}

export default Security;