import React from "react"
import useAuth from "../../../core/hooks/useAuth"
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";

export default React.memo(() => {

    const { user } = useAuth();

    return !user &&
        <div className="col-8 text-align-center ">
            <h6>Or authentify using</h6>
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