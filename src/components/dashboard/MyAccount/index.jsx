
"use client"

import { useTranslations } from "next-intl";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { Avatar, Button, Input, Link, Skeleton } from "@nextui-org/react";

const MyAccount = ({ locale }) => {
  const t = useTranslations('profile');
  const [user, loading] = useAuthState(auth);
  console.log(loading)

  return (
    <section role="section" className="mt-8">
      <div className="flex justify-center select-none">
        <Skeleton isLoaded={loading === false ? true : false} className="p-1 rounded-full">
          <Avatar
            isBordered
            showFallback
            className="transition-transform"
            color="primary"
            name={user?.displayName}
            classNames={{
              img: "w-32 h-32",
              icon: "w-16 h-16",
              name: "text-xl",
              base: "w-32 h-32"
            }}
            src={user?.photoURL}
          />
        </Skeleton>
      </div>
      <div className="flex justify-center mt-4 select-none">
        <Skeleton isLoaded={loading === false ? true : false} className="rounded-lg">
          <p className="text-2xl">{t('welcome')}, {user?.displayName}</p>
        </Skeleton>
      </div>

      <div className="w-[300px] md:w-[400px] items-center mx-auto flex flex-col">
        <div className="w-[300px] md:w-[400px]">
          <h2 className="mt-4">{t('email')}:</h2>
          <Skeleton isLoaded={loading === false ? true : false} className="rounded-lg mt-2">
            <Input
            isReadOnly
              className="truncate"
              name="email"
              label={t('email')}
              value={user?.email}
              endContent={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              }
            />
          </Skeleton>
        </div>
        <div className="w-[300px] md:w-[400px]">
          <h2 className="mt-4">{t('username')}:</h2>
          <Skeleton isLoaded={loading === false ? true : false} className="rounded-lg mt-2">
            <Input
            isReadOnly
              className="truncate mt-2"
              name="username"
              label={t('username')}
              value={user?.displayName}
              endContent={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              }
            />
          </Skeleton>
        </div>
        {
          user?.providerData?.map(pData => (
            <div key={pData.providerId}>
              {
                pData.providerId === "facebook.com" ? (
                  <></>
                ) : pData.providerId === "google.com" ? (
                  <></>
                ) : pData.providerId === "password" ? (
                  <div className="w-[300px] md:w-[400px]">
                    <h2 className="mt-4">{t('password')}:</h2>
                    <Skeleton isLoaded={loading === false ? true : false} className="rounded-lg mt-2">
                      <Link className="w-[300px] md:w-[400px]" href="/change-password">
                        <Input
                          isReadOnly
                          className="truncate mt-2"
                          name="password"
                          label={t('password')}
                          value="*******"
                          endContent={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                          }
                        />
                      </Link>
                    </Skeleton>
                  </div>
                ) : (
                  <></>
                )}
            </div>
          ))
        }
      </div>
      <div className="flex justify-center mt-10 flex-row">
        <Skeleton isLoaded={loading === false ? true : false} className="rounded-lg">
          <Button
            as={Link}
            href="/signout"
            color="danger"
            variant="flat"
          >
            {t('signout')}
          </Button>
        </Skeleton>
        <Skeleton isLoaded={loading === false ? true : false} className={locale === "ar" ? "mr-4 rounded-lg" : "ml-4 rounded-lg"}>
          <Button
            color="primary"
            variant="flat"
          >
            {t('change_account_information')}
          </Button>
        </Skeleton>
      </div>
    </section>
  )
}

export default MyAccount;