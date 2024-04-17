"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { auth } from "../../../../lib/firebase";
import GoogleLogin from "../../google.login";
import FacebookLogin from "../../facebook.login";

const SignupForm = ({ locale }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypedPassword, setshowRetypedPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [usernameInputError, setUsernameInputError] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [createUserWithEmailAndPassword, _user, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const t = useTranslations("signup");
  const router = useRouter();

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      setUserMessage("");
      setMessage("");
      if (password && email && username && password === retypePassword) {
        createUserWithEmailAndPassword(email, password)
          .then(async (userCredential) => {
            onOpen();
            updateProfile({
              displayName: username,
            }).then(async () => {
              sessionStorage.removeItem("user");
              sessionStorage.setItem(
                "user",
                JSON.stringify(userCredential?.user)
              );
              const body = {
                provider: "password",
                id: await userCredential?.user?.uid,
                email: await userCredential?.user?.email,
                username: await userCredential?.user?.displayName,
                password,
                photoURL: await userCredential?.user?.photoURL,
                emailVerified: await userCredential?.user?.emailVerified,
              };
              if (!error) {
                const response = await fetch(
                  "http://38.242.214.31:3002/api/v1/register",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                  }
                );

                const data = await response.json();
                if (data) {
                  if (response.ok) {
                    setUserMessage("success");
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setRetypePassword("");
                    localStorage?.setItem("token", data?.token);
                    await sendEmailVerification(userCredential?.user).then(
                      async () => {
                        setTimeout(() => router.push("/dashboard"), 3000);
                      }
                    );
                  } else {
                    userCredential?.user?.delete();
                    setMessage(t("unknown_error"));
                  }
                }
              }
            });
          })
          .catch(() => {
            setMessage(t("unknown_error"));
          });
      } else {
        if (!username) setUsernameInputError(true);
      }
    } catch (error) {
      setMessage(t("unknown_error"));
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

  const validatePassword = (password) =>
    password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W|_)(?=.{7,})/);
  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isEmailInvalid = useMemo(() => {
    if (email === "") return true;

    return validateEmail(email) ? false : 0;
  }, [email]);

  const isPasswordInvalid = useMemo(() => {
    if (password === "") return true;
    const isValid = validatePassword(password) ? false : 1;
    return isValid;
  }, [password]);

  const isMatchPasswordInvalid = useMemo(() => {
    if (retypePassword && password !== retypePassword) return 0;
    if (retypePassword && password === retypePassword) return false;
    return true;
  }, [password, retypePassword]);
  return (
    <>
      <div className="flex justify-center">
        <h1 className="my-4 text-xl">{t("signup")}</h1>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleForm}
          className="w-[300px] md:w-[400px] space-y-6"
        >
          {locale === "ar" ? (
            <>
              <Input
                isRequired
                type="text"
                name="username"
                variant="filled"
                label={t("username")}
                placeholder={t("enter_your_username")}
                value={username}
                onValueChange={setUsername}
                autoComplete="username"
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                }
                isInvalid={usernameInputError}
                errorMessage={usernameInputError && t("username_required")}
              />
              <Input
                isRequired
                type="email"
                name="email"
                label={t("email")}
                placeholder={t("enter_your_email")}
                value={email}
                autoComplete="email"
                isInvalid={isEmailInvalid}
                errorMessage={
                  isEmailInvalid === true
                    ? t("email_required")
                    : isEmailInvalid === 0 && t("email_invalid")
                }
                onValueChange={setEmail}
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
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
                autoComplete="current-password"
                isInvalid={isPasswordInvalid}
                errorMessage={
                  isPasswordInvalid === true
                    ? t("password_required")
                    : isPasswordInvalid === 1 &&
                      t("the_password_should_contains_special_charachters")
                }
                onValueChange={setPassword}
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
                        stroke="currentColor"
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
                        stroke="currentColor"
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
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
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
              <Input
                isRequired
                autoComplete="current-password"
                name="retypePassword"
                label={t("password")}
                placeholder={t("re_enter_your_password")}
                value={retypePassword}
                isInvalid={isMatchPasswordInvalid}
                errorMessage={
                  isMatchPasswordInvalid === true
                    ? t("password_match_required")
                    : isMatchPasswordInvalid === 0 &&
                      t("match_password_doesnt_match")
                }
                onValueChange={setRetypePassword}
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
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
                    onClick={() => setshowRetypedPassword(!showRetypedPassword)}
                  >
                    {showRetypedPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
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
                        stroke="currentColor"
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
                type={showRetypedPassword ? "text" : "password"}
              />
            </>
          ) : (
            <>
              <Input
                isRequired
                type="text"
                name="username"
                variant="filled"
                label={t("username")}
                placeholder={t("enter_your_username")}
                value={username}
                onValueChange={setUsername}
                autoComplete="username"
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                }
                isInvalid={usernameInputError}
                errorMessage={usernameInputError && t("username_required")}
              />
              <Input
                isRequired
                type="email"
                name="email"
                autoComplete="email"
                label={t("email")}
                placeholder={t("enter_your_email")}
                value={email}
                isInvalid={isEmailInvalid}
                errorMessage={
                  isEmailInvalid === true
                    ? t("email_required")
                    : isEmailInvalid === 0 && t("email_invalid")
                }
                onValueChange={setEmail}
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
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
                autoComplete="current-password"
                isInvalid={isPasswordInvalid}
                errorMessage={
                  isPasswordInvalid === true
                    ? t("password_required")
                    : isPasswordInvalid === 1 &&
                      t("the_password_should_contains_special_charachters")
                }
                onValueChange={setPassword}
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
                        stroke="currentColor"
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
                        stroke="currentColor"
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
                    stroke="currentColor"
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
              <Input
                isRequired
                name="retypePassword"
                label={t("password")}
                placeholder={t("re_enter_your_password")}
                value={retypePassword}
                autoComplete="current-password"
                isInvalid={isMatchPasswordInvalid}
                errorMessage={
                  isMatchPasswordInvalid === true
                    ? t("password_match_required")
                    : isMatchPasswordInvalid === 0 &&
                      t("match_password_doesnt_match")
                }
                onValueChange={setRetypePassword}
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
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
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setshowRetypedPassword(!showRetypedPassword)}
                  >
                    {showRetypedPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
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
                        stroke="currentColor"
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
                type={showRetypedPassword ? "text" : "password"}
              />
            </>
          )}
          <div className="flex justify-center mt-4">
            <p>
              {t("already_have_account")}
              <Link href="/login" className="text-primary">
                {t("login")}{" "}
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
              {t("signup_button")}
            </Button>
          </div>
          <div className="flex justify-center">
            <GoogleLogin />
            <FacebookLogin />
          </div>
        </form>
      </div>
      <Modal
        className="rtl:ltr"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {message ? t("error") : t("signup_success")}
              </ModalHeader>
              <ModalBody>
                <p>
                  {message
                    ? message
                    : userMessage === "success" ??
                      t("signup_success_description")}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
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
export default SignupForm;
