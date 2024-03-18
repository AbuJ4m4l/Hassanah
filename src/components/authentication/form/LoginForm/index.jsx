"use client";

import { useEffect, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import {
  Button,
  Input,
  Link,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import GoogleLogin from "../../google.login/index.jsx";
import FacebookLogin from "../../facebook.login/index.jsx";

const LoginForm = ({ locale }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [message, setMessage] = useState("");
  var { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [signInWithEmailAndPassword, _user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  const t = useTranslations("login");
  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return true;

    return validateEmail(email) ? false : true;
  }, [email]);

  const isPasswordInvalid = useMemo(() => {
    if (password === "") return true;
    return false;
  }, [password]);

  const router = useRouter();

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      setUserMessage("");
      setMessage("");
      if (password && email) {
        signInWithEmailAndPassword(email, password).then((data) => {
          if (data?.user?.email) {
            setUserMessage(t("login_success_description"));
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(data.user));
            setTimeout(() => router.push("/dashboard"), 3000);
          }
          onOpen();
        });
      } else {
        if (!password) setPasswordInputError(true);
        if (!email) setEmailInputError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (error?.code) {
      switch (error?.code.toString().toLowerCase()) {
        case "auth/claims-too-large":
          setMessage(t("claimsTooLarge"));
          break;
        case "auth/email-already-exists":
          setMessage(t("emailAlreadyExists"));
          break;
        case "auth/id-token-expired":
          setMessage(t("idTokenExpired"));
          break;
        case "auth/id-token-revoked":
          setMessage(t("idTokenRevoked"));
          break;
        case "auth/insufficient-permission":
          setMessage(t("insufficientPermission"));
          break;
        case "auth/internal-error":
          setMessage(t("internalError"));
          break;
        case "auth/invalid-argument":
          setMessage(t("invalidArgument"));
          break;
        case "auth/invalid-claims":
          setMessage(t("invalidClaims"));
          break;
        case "auth/invalid-continue-uri":
          setMessage("invalidContinueUri");
          break;
        case "auth/invalid-credential":
          setMessage(t("invalidCredential"));
          break;
        case "auth/invalid-creation-time":
          setMessage(t("invalidCreationTime"));
          break;
        default:
          setMessage(t("unknown_error"));
      }
    }
  }, [error?.code, t]);
  return (
    <>
      <div className="flex justify-center">
        <h1 className="my-4 text-xl">{t("login")}</h1>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleForm}
          className="w-[300px] md:w-[400px] space-y-6"
        >
          {locale === "ar" ? (
            <>
              <Input
                isClearable
                isRequired
                type="email"
                name="email"
                label={t("email")}
                placeholder={t("enter_your_email")}
                value={email}
                autoComplete="email"
                onClear={() => setEmail("")}
                isInvalid={isEmailInvalid}
                color={isEmailInvalid ? "danger" : "default"}
                errorMessage={isEmailInvalid && t("email_invalid")}
                onValueChange={setEmail}
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-mail"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                }
              />
              <Input
                isRequired
                name="password"
                label={t("password")}
                placeholder={t("enter_your_password")}
                value={password}
                isInvalid={isPasswordInvalid}
                color={isPasswordInvalid ? "danger" : "default"}
                errorMessage={isPasswordInvalid && t("password_required")}
                onValueChange={setPassword}
                autoComplete="current-password"
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-lock"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                }
                startContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye-off"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    )}
                  </button>
                }
                type={showPassword ? "text" : "password"}
              />
            </>
          ) : (
            <>
              <Input
                isRequired
                isClearable
                type="email"
                name="email"
                label={t("email")}
                placeholder={t("enter_your_email")}
                value={email}
                autoComplete="email"
                onClear={() => setEmail("")}
                isInvalid={isEmailInvalid}
                color={isEmailInvalid ? "danger" : "default"}
                errorMessage={isEmailInvalid && t("email_invalid")}
                onValueChange={setEmail}
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-mail"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                }
              />
              <Input
                isRequired
                name="password"
                label={t("password")}
                placeholder={t("enter_your_password")}
                value={password}
                isInvalid={isPasswordInvalid}
                color={isPasswordInvalid ? "danger" : "default"}
                errorMessage={isPasswordInvalid && t("password_required")}
                onValueChange={setPassword}
                autoComplete="current-password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye-off"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    )}
                  </button>
                }
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-lock"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                }
                type={showPassword ? "text" : "password"}
              />
            </>
          )}
          <div className="flex justify-center">
            <p>
              {t("forget_password")}
              <Link href="/reset-password" className="text-primary">
                {t("reset_password")}
              </Link>
            </p>
          </div>
          <div className="flex justify-center">
            <p>
              {t("dont_have_account")}
              <Link href="/signup" className="text-primary">
                {t("signup")}
              </Link>
            </p>
          </div>
          <div className="flex flex-row mt-4">
            <Button
              variant="solid"
              color="primary"
              type="submit"
              onClick={handleForm}
              className="w-full"
            >
              {t("login_button")}
            </Button>
          </div>
          <div className="flex justify-center">
            <GoogleLogin />
            <FacebookLogin />
          </div>
        </form>
      </div>
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {message ? t("error") : t("login_success")}
              </ModalHeader>
              <ModalBody>
                <p>
                  {message
                    ? message
                    : userMessage ?? t("login_success_description")}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("close")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginForm;
