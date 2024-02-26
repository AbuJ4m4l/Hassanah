"use client"
import { Avatar } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Profile = () => {
    const { data: session } = useSession();
    const t = useTranslations('profile');
    return (
        <>
            <aside id="default-sidebar" class="fixed -mt-[40px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-secondry">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <a href="#" class="flex items-center p-2 text-white hover:bg-gray-700 group">
                                <svg class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span class="ms-3">Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

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

        </>
    )
}

export default Profile;