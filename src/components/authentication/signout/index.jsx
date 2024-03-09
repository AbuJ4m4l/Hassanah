"use client"
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { FontAwesomeIcon, faRightFromBracket } from "@fortawesome/react-fontawesome";

const Signout = ({ style }) => {

    const [signout] = useSignOut(auth)
    return (
        <>
        <button className={style ? style : "btn bg-red-600 hover:bg-transparent border-2 border-red-600 hover:text-red-600"} onClick={signout}><FontAwesomeIcon icon={faRightFromBracket} className="rtl:ml-2 ltr:mr-2"/>Signout</button>
        </>
    )
}
export default Signout;