import React from "react"
import Language from "./Language/Language"
import Currency from "./Currency/Currency"

export default React.memo(() => {
    return <>
        <Language />
        <Currency />
    </>
})