"use client"
import {
    Button,
    ChakraProvider,
    extendTheme,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    InputLeftElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import theme from '../../../commonTheme';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Signup({ params: { locale } }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypedPassword, setshowRetypedPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const [usernameInputError, setUsernameInputError] = useState(false);
    const [emailInputError, setEmailInputError] = useState(false);
    const [passwordInputError, setPasswordInputError] = useState(false);
    const [matchPasswordInputError, setMatchPasswordInputError] = useState(false);
    const [signupButtonStatus, setSignupButtonStatus] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState(null);

    const t = useTranslations('signup');

    const handleClickOnPassword = () => setShowPassword(!showPassword);
    const handleClickOnRetypedPassword = () => setshowRetypedPassword(!showRetypedPassword);
    const handleForm = async (e) => {
        try {
            e.preventDefault();
            const id = await Math.floor(Math.random() * 10000000000000000);
            await signIn('signup', {
                redirect: true,
                username: username,
                email: email,
                password: password,
                retypePassword: retypePassword,
                userAgent: navigator.userAgent,
                userAgentID: id
            });
        } catch (error) {
            console.error(error);
        }
    };

    const validatePassword = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W|_)(?=.{7,})/;
        const result = regex.test(password);
        if (result === false) {
            setTimeout(() => {
                setPasswordInputError(0);
            }, 200)
        } else if (result === true) {
            setTimeout(() => {
                setPasswordInputError(false);
            }, 200)
        }
        setPasswordStatus(result)
        return result;
    };

    if (passwordStatus === false || usernameInputError || passwordInputError || emailInputError || matchPasswordInputError) {
        setTimeout(() => {
            setSignupButtonStatus(false);
        }, 200)
    } else if (passwordStatus && usernameInputError === false && passwordInputError === false && emailInputError === false && matchPasswordInputError === false && (username && email && password && retypePassword) && (password === retypePassword)) {
        setTimeout(() => {
            setSignupButtonStatus(true);
        }, 200)
    }

    if (password !== retypePassword) {
        setTimeout(() => {
            setMatchPasswordInputError(0);
        }, 200);
    } else if (password === retypePassword) {
        setTimeout(() => {
            setMatchPasswordInputError(false);
        }, 200);
    }

    const { data: session } = useSession();
    return (
        <>
            <div className="flex justify-center">
                <h1 className="my-4 text-xl">{t('signup')}</h1>
            </div>
            <div className="flex justify-center">
                <ChakraProvider theme={theme}>
                    <form onSubmit={handleForm}>
                        <Stack spacing={4} className='w-[300px]'>
                            <FormControl isInvalid={usernameInputError}>
                                <Input
                                    type="text"
                                    name="username"
                                    variant="filled"
                                    placeholder={t('username')}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={(e) => setUsernameInputError(e.target.value.trim() === '')}
                                />
                                <FormErrorMessage>{t('username_required')}</FormErrorMessage>
                            </FormControl>
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
                            <FormControl isInvalid={passwordInputError === 0 ? true : passwordInputError ? true : false}>
                                <InputGroup size="md">
                                    {locale === "ar" ? (
                                        <>
                                            <Input pl="4.5rem" name="password" type={showPassword ? 'text' : 'password'} placeholder={t('password')} variant="filled" value={password} onChange={(e) => {
                                                setPassword(e.target.value)

                                                validatePassword();
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

                                                validatePassword();
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
                                <FormErrorMessage>{passwordInputError === true ? t('password_required') : passwordInputError === 0 ? t('the_password_should_contains_special_charachters') : null}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={matchPasswordInputError === 0 ? true : matchPasswordInputError ? true : false}>
                                <InputGroup size="md">
                                    {
                                        locale === "ar" ? (
                                            <>
                                                <Input
                                                    pl="4.5rem"
                                                    type={showRetypedPassword ? 'text' : 'password'}
                                                    placeholder={t('retype_password')}
                                                    variant="filled"
                                                    name="retypePassword"
                                                    value={retypePassword}
                                                    onChange={(e) => setRetypePassword(e.target.value)}
                                                    onBlur={(e) => setMatchPasswordInputError(e.target.value.trim() === '')}
                                                />
                                                <InputLeftElement width="4.5rem">
                                                    <button type="button" onClick={handleClickOnRetypedPassword}>
                                                        {showRetypedPassword ? (
                                                            <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                                                        ) : (
                                                            <FontAwesomeIcon icon={faEye} size="sm" />
                                                        )}
                                                    </button>
                                                </InputLeftElement>
                                            </>
                                        ) : (
                                            <>
                                                <Input
                                                    pr="4.5rem"
                                                    name='retypePassword'
                                                    type={showRetypedPassword ? 'text' : 'password'}
                                                    placeholder={t('retype_password')}
                                                    variant="filled"
                                                    value={retypePassword}
                                                    onChange={(e) => setRetypePassword(e.target.value)}
                                                    onBlur={(e) => setMatchPasswordInputError(e.target.value.trim() === '')}
                                                />
                                                <InputRightElement width="4.5rem">
                                                    <button type='button' onClick={handleClickOnRetypedPassword}>
                                                        {showRetypedPassword ? (
                                                            <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                                                        ) : (
                                                            <FontAwesomeIcon icon={faEye} size="sm" />
                                                        )}
                                                    </button>
                                                </InputRightElement>
                                            </>
                                        )
                                    }
                                </InputGroup>
                                <FormErrorMessage>{matchPasswordInputError === 0 ? t('password_doesnt_match') : matchPasswordInputError === true ? t('password_match_required') : null}</FormErrorMessage>
                            </FormControl>
                            <div className="flex justify-center mt-4">
                                <p>{t('already_have_account')}<Link href="/login" className="text-primary">{t('login')} </Link></p>
                            </div>
                            <div className="flex flex-row mt-4">
                                {
                                    signupButtonStatus === true ? <button type='submit' className="w-full btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary">{t('signup_button')}</button> : <button type='button' disabled className="w-full btn bg-slate-400 text-slate-500 cursor-not-allowed">{t('signup_button')}</button>
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
    );
}
