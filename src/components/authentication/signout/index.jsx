"use client"
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

const Signout = ({ style }) => {

    const [signout] = useSignOut(auth)
    return (
        <>
            <button className={style ? style : "btn bg-primary hover:bg-transparent border-2 border-primary hover:text-primary"} onClick={signout}>Signout</button>
        </>
    )
}
export default Signout;