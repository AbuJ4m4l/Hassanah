"use client";
import { ChakraProvider, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import theme from "../../../commonTheme";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Login = ({ params: { locale } }) => {
    const [emailInputError, setEmailInputError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputError, setPasswordInputError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginButtonStatus, setLoginButtonStatus] = useState(false);
    const t = useTranslations('login');
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
            const id = await Math.floor(Math.random() * 10000000000000000);
            localStorage.setItem("userAgentID", id);
            await signIn('login', {
                redirect: false,
                email: email,
                password: password,
                userAgent: navigator.userAgent,
                userAgentID: id
            });
            console.log(true)
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
                        <Stack spacing={4} className='w-[300px]'>
                            <FormControl isInvalid={emailInputError}>
                                <Input
                                    type="email"
                                    name="email"
                                    variant="filled"
                                    placeholder={t('email')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={(e) => setEmailInputError(e.target.value.trim() === '')}
                                />
                                <FormErrorMessage>{t('email_required')}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={passwordInputError ? true : false}>
                                <InputGroup size="md">
                                    {locale === "ar" ? (
                                        <>
                                            <Input pl="4.5rem" name="password" type={showPassword ? 'text' : 'password'} placeholder={t('password')} variant="filled" value={password} onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} onBlur={(e) => {
                                                setPasswordInputError(e.target.value.trim() === '');
                                            }} />
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
                                            }} />
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
                                <FormErrorMessage>{passwordInputError ? t('password_required') : null}</FormErrorMessage>
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
                                <button type="button" onClick={() => signIn('google')} className="flex rtl:ml-2 ltr:mr-2 justify-center w-[50%] hover:bg-secondry bg-secondry-light cursor-pointer px-4 py-2 border gap-2 border-slate-600 rounded-lg text-white hover:border-slate-900 hover:shadow transition duration-150">
                                    <Image
                                        className="w-6 h-6"
                                        width={6}
                                        height={6} src="/images/google.svg"
                                        loading="lazy"
                                        alt="Google logo"
                                    />
                                </button>
                                <button type="button" onClick={() => signIn('discord')} className="flex rtl:mr-2 ltr:ml-2 justify-center w-[50%] hover:bg-secondry bg-secondry-light cursor-pointer px-4 py-2 border gap-2 border-slate-600 rounded-lg text-white hover:border-slate-900 hover:shadow transition duration-150">
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