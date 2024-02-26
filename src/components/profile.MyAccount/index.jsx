
"use client"
import { Avatar, ChakraProvider, Inpu, Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import theme from "../../commonTheme";

const MyAccount = () => {
  const { data: session } = useSession();
  const t = useTranslations('profile');
  return (
    <>
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
          <div className="flex justify-center mt-4 select-none w-[300px] bg-secondry-light rounded-lg py-3 border-primary border-2">
            <p>{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAccount;