import React from "react"
import Name from "./Name/Name"
import FirstName from "./Firstname/Firstname"

export default React.memo(() => {
    return <>
    <Name />
    <FirstName/>
    </>
})