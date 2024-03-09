"use client"
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const Signout = ({ style, iconSize }) => {
    const t = useTranslations('signout')
    const [signout] = useSignOut(auth)
    return (
        <>
            <button className={style ? style : "btn bg-red-600 hover:bg-transparent border-2 border-red-600 hover:text-red-600"} onClick={signout}><FontAwesomeIcon icon={faRightFromBracket} size={iconSize ? iconSize : "sm"} className="rtl:ml-2 ltr:mr-2" />{t('signout')}</button>
        </>
    )
}
export default Signout;