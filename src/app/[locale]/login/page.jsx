"use client";
import { Alert, AlertDescription, AlertIcon, AlertTitle, ChakraProvider, CloseButton, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Stack, useDisclosure } from "@chakra-ui/react";
import theme from "../../../commonTheme";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import GoogleLogin from "../../../components/google.login";
import FacebookLogin from "../../../components/facebook.login";

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
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signInWithFacebook] = useSignInWithFacebook(auth);
    const t = useTranslations('login');
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true });

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
    const router = useRouter();
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
                signInWithEmailAndPassword(email, password)
                    .then(data => {
                        setUserMessage('success');
                        sessionStorage.removeItem('user');
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                        setTimeout(() => router.push('/dashboard'), 2500);
                    })
                    .catch(() => {
                        setError(t('unknown_error'));
                    })
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
                                <GoogleLogin />
                                <FacebookLogin />
                            </div>
                        </Stack>
                    </form>
                </ChakraProvider>
            </div>
        </>
    )
}

export default Login;
