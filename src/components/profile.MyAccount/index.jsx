
"use client"
import { Avatar, Tooltip, useToast } from "@chakra-ui/react";
import { faEye, faEyeSlash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyAccount = () => {
  const { data: session } = useSession();
  const t = useTranslations('profile');
  const router = useRouter();
  session ? null : router.push('/login');
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState(session?.user?.email)
  const [revealEmail, setRevealEmail] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getDomain = () => {
      const revealedEmail = session?.user?.email.split('@')[1];
      setDomain(revealedEmail);
      setEmail(session?.user?.email);
    }
    getDomain();
  }, [session]);
  return (
    <section role="My-Account">
      <div className="flex justify-center select-none">
        <div className="outline-offset-2 outline-4 outline-primary rounded-full outline max-w-[8.2rem] p-1">
          <Avatar
            src={session?.user?.image}
            name={session?.user?.name}
            size="xl"
          />
        </div>
      </div>
      <div className="flex justify-center mt-4 select-none">
        <p className="text-2xl">{t('welcome')}, {session?.user?.name}</p>
      </div>

      <div>
        <div>
          <h2 className="mt-4">Email:</h2>
          <div className="flex items-center justify-items-center justify-center mt-4 select-none w-[300px] bg-secondry rounded-lg py-2 border-primary border-2">
            <button onClick={() => setRevealEmail(revealEmail !== true)} className="ltr:right-6 rtl:left-6 relative">
              <Tooltip hasArrow label={t('reveal_tooltip')} bg='#343434' color='white'>
                <FontAwesomeIcon icon={revealEmail ? faEye : faEyeSlash} />
              </Tooltip>
            </button>
            <Tooltip hasArrow label={t('copy')} bg='#343434' color='white'>
              <p dir="ltr" onClick={
                () => {
                  navigator.clipboard.writeText(session?.user?.email)
                    .then(() => {
                      toast({
                        title: t('copied'),
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                      })
                    })
                    .catch(() => {
                      toast({
                        title: t('failed'),
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                      });
                    })
                }
              } className="w-[200px] truncate">{
                  revealEmail ? `*********@${domain}` : email
                }</p>
            </Tooltip>
          </div>
          <h2 className="mt-4">Username:</h2>
          <Tooltip hasArrow label={t('copy')} bg='#343434' color='white'>
            <div className="flex justify-center mt-4 select-none w-[300px] bg-secondry rounded-lg py-2 border-primary border-2">
              <button className="ltr:right-6 rtl:left-6 relative">
                <Tooltip hasArrow label={t('edit_password_tooltip')} bg='#343434' color='white'>
                  <Link href="/change-username"><FontAwesomeIcon icon={faPenToSquare} /></Link>
                </Tooltip>
              </button>
              <p onClick={
                () => {
                  navigator.clipboard.writeText(session?.user?.name)
                    .then(() => {
                      toast({
                        title: t('copied'),
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                      })
                    })
                    .catch(() => {
                      toast({
                        title: t('failed'),
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                      })
                    });
                }
              } className="w-[200px] truncate">{session?.user?.name}</p>
            </div>
          </Tooltip>
          <h2 className="mt-4">Password:</h2>
          <div className="flex justify-center mt-4 select-none w-[300px] bg-secondry rounded-lg py-2 border-primary border-2">
            <button className="ltr:right-6 rtl:left-6 relative">
              <Tooltip hasArrow label={t('edit_password_tooltip')} bg='#343434' color='white'>
                <Link href="/reset-password"><FontAwesomeIcon icon={faPenToSquare} /></Link>
              </Tooltip>
            </button>
            <p className="w-[200px]">************</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyAccount;