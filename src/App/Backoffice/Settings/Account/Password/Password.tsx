import React from "react"
import Button from "../../../../../partials/Button/Button"
import Icon from "../../../../../partials/Icon/Icon"

export default React.memo(() => {
    return <>
        <div className="d-flex justify-content-between my-2">
            <p>Password</p>
            <Button><Icon variant="chevron-right" /></Button>
        </div>
    </>
})