"use client";

import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useEffect } from "react";

const Middleware = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [Signout] = useSignOut(auth);
  useEffect(() => {
    if (loading === false) {
      if (user) {
        const token = localStorage?.getItem("token");
        if (!token) {
          Signout();
        }
        sessionStorage?.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage?.removeItem("user");
        localStorage?.removeItem("token");
      }
    }
  }, [user, loading, Signout]);

  return <>{children}</>;
};

export default Middleware;
