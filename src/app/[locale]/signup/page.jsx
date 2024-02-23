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
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import theme from '../../../commonTheme';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';

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
    const [userMessage, setUserMessage] = useState('');
    const [Error, setError] = useState('');
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })
    const t = useTranslations('signup');
    const router = useRouter();

    const handleClickOnPassword = () => setShowPassword(!showPassword);
    const handleClickOnRetypedPassword = () => setshowRetypedPassword(!showRetypedPassword);
    const handleForm = async (e) => {
        try {
            e.preventDefault();
            setUserMessage('');
            setError('');
            if (password !== retypePassword) setMatchPasswordInputError(0);
            if (!username) setUsernameInputError(true);
            if (!password) setPasswordInputError(true);
            if (email && !email.includes('@')) setEmailInputError(0);
            if (!email) setEmailInputError(true);
            if (password && password.length < 8 || !passwordStatus) setPasswordInputError(0);
            if (password && email && username && (password === retypePassword)) {
                const id = await Math.floor(Math.random() * 10000000000000000);
                localStorage.setItem("userAgentID", id);
                await signIn('signup', {
                    redirect: false,
                    username: username,
                    email: email,
                    password: password,
                    retypePassword: retypePassword,
                    userAgent: navigator.userAgent,
                    userAgentID: id
                })
                    .then(({ ok, error }) => {
                        if (ok) {
                            setUserMessage(t('signup_success'));
                            const redirect_url = query.get('redirect_url');
                            if (redirect_url) {
                                router.push(redirect_url);
                            } else {
                                setTimeout(() => {
                                    router.push('/profile');
                                }, 1500);
                            }
                        } else if (error) {
                            setError(error);
                        }
                    });
            } else {
                if (password !== retypePassword) setMatchPasswordInputError(0);
                if (!username) setUsernameInputError(true);
                if (!password) setPasswordInputError(true);
                if (email && !email.includes('@')) setEmailInputError(0);
                if (!email) setEmailInputError(true);
                if (password && password.length < 8 || !passwordStatus) setPasswordInputError(0);
            }
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

    const query = useSearchParams();
    return (
        <>
            <div className="flex justify-center">
                <h1 className="my-4 text-xl">{t('signup')}</h1>
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
                                            {t('signup_success')}
                                        </AlertTitle>
                                        <AlertDescription maxWidth='sm' className="text-black">
                                            {t('signup_success_description')}
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
                                            {t('error_credentials_signin_title')}
                                        </AlertTitle>
                                        <AlertDescription className='text-black'>
                                            {t('error_credentials_signin_description')}
                                        </AlertDescription>
                                    </Alert>
                                ) : <></>
                            }
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
                                <FormErrorMessage>{emailInputError === true ? t('email_required') : t('email_invalid')}</FormErrorMessage>
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
                                <button type='submit' className="w-full btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary">{t('signup_button')}</button>

                            </div>
                            <div className="flex justify-center">
                                <button type="button" onClick={() => {
                                    const redirect_url = query.get('redirect_url');
                                    redirect_url ? signIn('google')
                                        .then(() => {
                                            router.push(redirect_url);
                                        }) : signIn('google');
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
                                        .then(() => {
                                            router.push(redirect_url);
                                        }) : signIn('discord');
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
    );
}
