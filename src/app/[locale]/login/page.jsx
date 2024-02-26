"use client";
import { Alert, AlertDescription, AlertIcon, AlertTitle, ChakraProvider, CloseButton, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Stack, useDisclosure } from "@chakra-ui/react";
import theme from "../../../commonTheme";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const Login = ({ params: { locale } }) => {
    const [emailInputError, setEmailInputError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputError, setPasswordInputError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginButtonStatus, setLoginButtonStatus] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [Error, setError] = useState('');
    const [ErrorDescription, setErrorDescription] = useState('');
    const t = useTranslations('login');
    const router = useRouter();
    const query = useSearchParams();
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true });

    const errors = {
        OAuthSignin: t('OAuthSignin_title'),
        OAuthCallback: t('OAuthCallback_title'),
        OAuthCreateAccount: t('OAuthCreateAccount_title'),
        EmailCreateAccount: t('EmailCreateAccount_title'),
        Callback: t('Callback_title'),
        OAuthAccountNotLinked: t('OAuthAccountNotLinked_title'),
        EmailSignin: t('EmailSignin_title'),
        CredentialsSignin: t('CredentialsSignin_title'),
        SessionRequired: t('SessionRequired_title'),
        Default: t('Default_title'),
    };

    const errorsDescriptions = {
        OAuthSignin: t('OAuthSignin_description'),
        OAuthCallback: t('OAuthCallback_description'),
        OAuthCreateAccount: t('OAuthCreateAccount_description'),
        EmailCreateAccount: t('EmailCreateAccount_description'),
        Callback: t('Callback_description'),
        OAuthAccountNotLinked: t('OAuthAccountNotLinked_description'),
        EmailSignin: t('EmailSignin_description'),
        CredentialsSignin: t('CredentialsSignin_description'),
        SessionRequired: t('SessionRequired_description'),
        Default: t('Default_description'),
    };


    if (password && email && password.length >= 8) {
        setTimeout(() => {
            setLoginButtonStatus(true);
        }, 200)
    } else {
        setTimeout(() => {
            setLoginButtonStatus(false);
        }, 200)
    }
    const handleClickOnPassword = () => setShowPassword(!showPassword);

    const handleForm = async (e) => {
        try {
            e.preventDefault();
            setUserMessage('');
            setError('');
            setErrorDescription('');
            if (!password) setPasswordInputError(true);
            if (email && !email.includes('@')) setEmailInputError(0);
            if (!email) setEmailInputError(true);
            if (password && password.length < 8) setPasswordInputError(0);
            if (password && email) {
                const id = await Math.floor(Math.random() * 10000000000000000);
                localStorage.setItem("userAgentID", id);
                await signIn('login', {
                    redirect: false,
                    email: email,
                    password: password,
                    userAgent: navigator.userAgent,
                    userAgentID: id
                })
                    .then(result => {
                        console.log(result.ok);
                        console.error(result.error);
                        if (result.ok) {
                            setUserMessage(t('login_success'));
                            const redirect_url = query.get('redirect_url');
                            if (redirect_url) {
                                router.push(redirect_url);
                            } else {
                                setTimeout(() => {
                                    router.push('/profile');
                                }, 1500);
                            }
                        } else if (result.error) {
                            if (result.error === 'OAuthSignin') {
                                setError(errors.OAuthSignin);
                                setErrorDescription(errorsDescriptions.OAuthSignin);
                            } else if (result.error === 'OAuthCallback') {
                                setError(errors.OAuthCallback);
                                setErrorDescription(errorsDescriptions.OAuthCallback);
                            } else if (result.error === 'OAuthCreateAccount') {
                                setError(errors.OAuthCreateAccount);
                                setErrorDescription(errorsDescriptions.OAuthCreateAccount);
                            } else if (result.error === 'EmailCreateAccount') {
                                setError(errors.EmailCreateAccount);
                                setErrorDescription(errorsDescriptions.EmailCreateAccount);
                            } else if (result.error === 'Callback') {
                                setError(errors.Callback);
                                setErrorDescription(ErrorDescriptions.Callback)
                            } else if (result.error === 'OAuthAccountNotLinked') {
                                setError(errors.OAuthAccountNotLinked);
                                setErrorDescription(errorsDescriptions.OAuthAccountNotLinked);
                            } else if (result.error === 'EmailSignin') {
                                setError(errors.EmailSignin);
                                setErrorDescription(errorsDescriptions.EmailSignin);
                            } else if (result.error === 'CredentialsSignin') {
                                setError(errors.CredentialsSignin);
                                setErrorDescription(errorsDescriptions.CredentialsSignin);
                            } else if (result.error === 'SessionRequired') {
                                setError(errors.SessionRequired);
                                setErrorDescription(errorsDescriptions.SessionRequired);
                            } else {
                                setError(errors.Default);
                                setErrorDescription(errorsDescriptions.Default);
                            }

                        }
                    });
            } else {
                if (!password) setPasswordInputError(true);
                if (email && !email.includes('@')) setEmailInputError(0);
                if (!email) setEmailInputError(true);
                if (password && password.length < 8) setPasswordInputError(0);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <h1 className="my-4 text-xl">{t('login')}</h1>
            </div>
            <div className="flex justify-center">
                <ChakraProvider theme={theme}>
                    <form onSubmit={handleForm}>
                        <Stack spacing={4} className='w-[300px] sm:w-[400px]'>
                            {
                                userMessage && (
                                    <Alert
                                        status='success'
                                        variant='subtle'
                                        flexDirection='column'
                                        alignItems='center'
                                        justifyContent='center'
                                        textAlign='center'
                                        height='170px'
                                        className='rounded-lg'
                                    >
                                        <CloseButton
                                            alignSelf='flex-start'
                                            position='relative'
                                            right={-1}
                                            top={-1}
                                            onClick={onClose}
                                            color="black"
                                        />
                                        <AlertIcon boxSize='40px' mr={0} />
                                        <AlertTitle mt={4} mb={1} fontSize='lg' className="text-black font-bold">
                                            {t('login_success')}
                                        </AlertTitle>
                                        <AlertDescription maxWidth='sm' className="text-black">
                                            {t('login_success_description')}
                                        </AlertDescription>
                                    </Alert>
                                )
                            }

                            {
                                Error ? (
                                    <Alert
                                        status='error'
                                        variant='subtle'
                                        flexDirection='column'
                                        alignItems='center'
                                        justifyContent='center'
                                        textAlign='center'
                                        height='230px'
                                        className='rounded-lg'
                                    >
                                        <CloseButton
                                            alignSelf='flex-start'
                                            position='relative'
                                            right={-1}
                                            top={-1}
                                            onClick={onClose}
                                            color="black"
                                        />
                                        <AlertIcon boxSize='40px' mr={0} />
                                        <AlertTitle mt={4} mb={1} fontSize='lg' className="text-black font-bold">
                                            {Error}
                                        </AlertTitle>
                                        <AlertDescription className='text-black'>
                                            {ErrorDescription}
                                        </AlertDescription>
                                    </Alert>
                                ) : <></>
                            }
                            <FormControl isInvalid={emailInputError}>
                                <Input
                                    type="email"
                                    name="email"
                                    variant="filled"
                                    placeholder={t('email')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={(e) => setEmailInputError(e.target.value.trim() === '')}
                                    autoComplete="email"
                                />
                                <FormErrorMessage>{emailInputError ? t('email_required') : t('email_invalid')}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={passwordInputError ? true : false}>
                                <InputGroup size="md">
                                    {locale === "ar" ? (
                                        <>
                                            <Input pl="4.5rem" name="password" type={showPassword ? 'text' : 'password'} placeholder={t('password')} variant="filled" value={password} onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} onBlur={(e) => {
                                                setPasswordInputError(e.target.value.trim() === '');
                                            }}
                                                autoComplete='current-password'
                                            />
                                            <InputLeftElement width="4.5rem">
                                                <button type="button" onClick={handleClickOnPassword}>
                                                    {showPassword ? (
                                                        <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faEye} size="sm" />
                                                    )}
                                                </button>
                                            </InputLeftElement>
                                        </>
                                    ) : (
                                        <>
                                            <Input pr="4.5rem" name="password" type={showPassword ? 'text' : 'password'} placeholder={t('password')} variant="filled" value={password} onChange={(e) => {
                                                setPassword(e.target.value);
                                            }} onBlur={(e) => {
                                                setPasswordInputError(e.target.value.trim() === '');
                                            }}
                                                autoComplete='current-password'
                                            />
                                            <InputRightElement width="4.5rem">
                                                <button type="button" onClick={handleClickOnPassword}>
                                                    {showPassword ? (
                                                        <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faEye} size="sm" />
                                                    )}
                                                </button>
                                            </InputRightElement>
                                        </>
                                    )}
                                </InputGroup>
                                <FormErrorMessage>{passwordInputError === true ? t('password_required') : t("password_length_error")}</FormErrorMessage>
                            </FormControl>
                            <div className="flex justify-center">
                                <p>{t('forget_password')}<Link href="/reset-password" className="text-primary">{t('reset_password')}</Link></p>
                            </div>
                            <div className="flex justify-center">
                                <p>{t('dont_have_account')}<Link href="/signup" className="text-primary">{t('signup')}</Link></p>
                            </div>
                            <div className="flex flex-row mt-4">
                                {
                                    loginButtonStatus === true ? <button type='submit' onClick={handleForm} className="w-full btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary">{t('login_button')}</button> : <button type='button' disabled className="w-full btn bg-slate-400 text-slate-500 cursor-not-allowed">{t('login_button')}</button>
                                }

                            </div>
                            <div className="flex justify-center">
                                <button type="button" onClick={() => {
                                    const redirect_url = query.get('redirect_url');
                                    redirect_url ? signIn('google')
                                        .then(({ ok, error }) => {
                                            if (ok) {
                                                router.push(redirect_url);
                                            }
                                            if (error) {
                                                if (error) {
                                                    if (error === 'OAuthSignin') {
                                                        setError(errors.OAuthSignin);
                                                        setErrorDescription(errorsDescriptions.OAuthSignin);
                                                    } else if (error === 'OAuthCallback') {
                                                        setError(errors.OAuthCallback);
                                                        setErrorDescription(errorsDescriptions.OAuthCallback);
                                                    } else if (error === 'OAuthCreateAccount') {
                                                        setError(errors.OAuthCreateAccount);
                                                        setErrorDescription(errorsDescriptions.OAuthCreateAccount);
                                                    } else if (error === 'EmailCreateAccount') {
                                                        setError(errors.EmailCreateAccount);
                                                        setErrorDescription(errorsDescriptions.EmailCreateAccount);
                                                    } else if (error === 'Callback') {
                                                        setError(errors.Callback);
                                                        setErrorDescription(ErrorDescriptions.Callback)
                                                    } else if (error === 'OAuthAccountNotLinked') {
                                                        setError(errors.OAuthAccountNotLinked);
                                                        setErrorDescription(errorsDescriptions.OAuthAccountNotLinked);
                                                    } else if (error === 'EmailSignin') {
                                                        setError(errors.EmailSignin);
                                                        setErrorDescription(errorsDescriptions.EmailSignin);
                                                    } else if (error === 'CredentialsSignin') {
                                                        setError(errors.CredentialsSignin);
                                                        setErrorDescription(errorsDescriptions.CredentialsSignin);
                                                    } else if (error === 'SessionRequired') {
                                                        setError(errors.SessionRequired);
                                                        setErrorDescription(errorsDescriptions.SessionRequired);
                                                    } else {
                                                        setError(errors.Default);
                                                        setErrorDescription(errorsDescriptions.Default);
                                                    }
                                                }
                                            }
                                        }) : signIn('google')
                                            .then(({ ok, error }) => {
                                                if (ok) {
                                                    router.push('/profile');
                                                }
                                                if (error) {
                                                    if (error === 'OAuthSignin') {
                                                        setError(errors.OAuthSignin);
                                                        setErrorDescription(errorsDescriptions.OAuthSignin);
                                                    } else if (error === 'OAuthCallback') {
                                                        setError(errors.OAuthCallback);
                                                        setErrorDescription(errorsDescriptions.OAuthCallback);
                                                    } else if (error === 'OAuthCreateAccount') {
                                                        setError(errors.OAuthCreateAccount);
                                                        setErrorDescription(errorsDescriptions.OAuthCreateAccount);
                                                    } else if (error === 'EmailCreateAccount') {
                                                        setError(errors.EmailCreateAccount);
                                                        setErrorDescription(errorsDescriptions.EmailCreateAccount);
                                                    } else if (error === 'Callback') {
                                                        setError(errors.Callback);
                                                        setErrorDescription(ErrorDescriptions.Callback)
                                                    } else if (error === 'OAuthAccountNotLinked') {
                                                        setError(errors.OAuthAccountNotLinked);
                                                        setErrorDescription(errorsDescriptions.OAuthAccountNotLinked);
                                                    } else if (error === 'EmailSignin') {
                                                        setError(errors.EmailSignin);
                                                        setErrorDescription(errorsDescriptions.EmailSignin);
                                                    } else if (error === 'CredentialsSignin') {
                                                        setError(errors.CredentialsSignin);
                                                        setErrorDescription(errorsDescriptions.CredentialsSignin);
                                                    } else if (error === 'SessionRequired') {
                                                        setError(errors.SessionRequired);
                                                        setErrorDescription(errorsDescriptions.SessionRequired);
                                                    } else {
                                                        setError(errors.Default);
                                                        setErrorDescription(errorsDescriptions.Default);
                                                    }
                                                }
                                            })
                                }} className="flex rtl:ml-2 ltr:mr-2 justify-center w-[50%] hover:bg-secondry bg-secondry-light cursor-pointer px-4 py-2 border gap-2 border-slate-600 rounded-lg text-white hover:border-slate-900 hover:shadow transition duration-150">
                                    <Image
                                        className="w-6 h-6"
                                        width={6}
                                        height={6} src="/images/google.svg"
                                        loading="lazy"
                                        alt="Google logo"
                                    />
                                </button>
                                <button type="button" onClick={() => {
                                    const redirect_url = query.get('redirect_url');
                                    redirect_url ? signIn('discord')
                                        .then(({ ok, error }) => {
                                            if (ok) {
                                                router.push(redirect_url);
                                            }
                                            if (error) {
                                                if (error) {
                                                    if (error === 'OAuthSignin') {
                                                        setError(errors.OAuthSignin);
                                                        setErrorDescription(errorsDescriptions.OAuthSignin);
                                                    } else if (error === 'OAuthCallback') {
                                                        setError(errors.OAuthCallback);
                                                        setErrorDescription(errorsDescriptions.OAuthCallback);
                                                    } else if (error === 'OAuthCreateAccount') {
                                                        setError(errors.OAuthCreateAccount);
                                                        setErrorDescription(errorsDescriptions.OAuthCreateAccount);
                                                    } else if (error === 'EmailCreateAccount') {
                                                        setError(errors.EmailCreateAccount);
                                                        setErrorDescription(errorsDescriptions.EmailCreateAccount);
                                                    } else if (error === 'Callback') {
                                                        setError(errors.Callback);
                                                        setErrorDescription(ErrorDescriptions.Callback)
                                                    } else if (error === 'OAuthAccountNotLinked') {
                                                        setError(errors.OAuthAccountNotLinked);
                                                        setErrorDescription(errorsDescriptions.OAuthAccountNotLinked);
                                                    } else if (error === 'EmailSignin') {
                                                        setError(errors.EmailSignin);
                                                        setErrorDescription(errorsDescriptions.EmailSignin);
                                                    } else if (error === 'CredentialsSignin') {
                                                        setError(errors.CredentialsSignin);
                                                        setErrorDescription(errorsDescriptions.CredentialsSignin);
                                                    } else if (error === 'SessionRequired') {
                                                        setError(errors.SessionRequired);
                                                        setErrorDescription(errorsDescriptions.SessionRequired);
                                                    } else {
                                                        setError(errors.Default);
                                                        setErrorDescription(errorsDescriptions.Default);
                                                    }
                                                }
                                            }
                                        }) : signIn('discord')
                                            .then(({ ok, error }) => {
                                                if (ok) {
                                                    router.push('/profile');
                                                }
                                                if (error) {
                                                    if (error === 'OAuthSignin') {
                                                        setError(errors.OAuthSignin);
                                                        setErrorDescription(errorsDescriptions.OAuthSignin);
                                                    } else if (error === 'OAuthCallback') {
                                                        setError(errors.OAuthCallback);
                                                        setErrorDescription(errorsDescriptions.OAuthCallback);
                                                    } else if (error === 'OAuthCreateAccount') {
                                                        setError(errors.OAuthCreateAccount);
                                                        setErrorDescription(errorsDescriptions.OAuthCreateAccount);
                                                    } else if (error === 'EmailCreateAccount') {
                                                        setError(errors.EmailCreateAccount);
                                                        setErrorDescription(errorsDescriptions.EmailCreateAccount);
                                                    } else if (error === 'Callback') {
                                                        setError(errors.Callback);
                                                        setErrorDescription(ErrorDescriptions.Callback)
                                                    } else if (error === 'OAuthAccountNotLinked') {
                                                        setError(errors.OAuthAccountNotLinked);
                                                        setErrorDescription(errorsDescriptions.OAuthAccountNotLinked);
                                                    } else if (error === 'EmailSignin') {
                                                        setError(errors.EmailSignin);
                                                        setErrorDescription(errorsDescriptions.EmailSignin);
                                                    } else if (error === 'CredentialsSignin') {
                                                        setError(errors.CredentialsSignin);
                                                        setErrorDescription(errorsDescriptions.CredentialsSignin);
                                                    } else if (error === 'SessionRequired') {
                                                        setError(errors.SessionRequired);
                                                        setErrorDescription(errorsDescriptions.SessionRequired);
                                                    } else {
                                                        setError(errors.Default);
                                                        setErrorDescription(errorsDescriptions.Default);
                                                    }
                                                }
                                            })
                                }} className="flex rtl:mr-2 ltr:ml-2 justify-center w-[50%] hover:bg-secondry bg-secondry-light cursor-pointer px-4 py-2 border gap-2 border-slate-600 rounded-lg text-white hover:border-slate-900 hover:shadow transition duration-150">
                                    <Image
                                        className="w-6 h-6"
                                        width={6}
                                        height={6} src="/images/discord.svg"
                                        loading="lazy"
                                        alt="Discord logo"
                                    />
                                </button>
                            </div>
                        </Stack>
                    </form>
                </ChakraProvider>
            </div>
        </>
    )
}

export default Login;
