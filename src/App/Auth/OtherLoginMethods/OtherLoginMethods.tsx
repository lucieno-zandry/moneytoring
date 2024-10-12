import React from "react"
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import { Translate } from "react-i18nify";

export default React.memo(() => {

    return <div className="col-8 text-align-center ">
            <h6><Translate value="application.or_authentify" /></h6>
            <div className="mt-3 d-flex gap-2 justify-content-center">
                <Button size="sm">
                    <Icon type="brands" variant="facebook" size={2} />
                </Button>
                <Button size="sm">
                    <Icon type="brands" variant="google" size={2} />
                </Button>
            </div>
        </div>
})