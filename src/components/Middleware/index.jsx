"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useEffect } from "react";

const Middleware = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading === false) {
      if (user) {
        sessionStorage?.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage?.removeItem("user");
      }
    }
  }, [user, loading]);

  return <>{children}</>;
};

export default Middleware;
