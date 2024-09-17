import React from "react"
import EmailAdress from "./EmailAdress/EmailAdress";
import Password from "./Password/Password";

export default React.memo(() => {
    return <>
        <EmailAdress />
        <Password />
    </>
})