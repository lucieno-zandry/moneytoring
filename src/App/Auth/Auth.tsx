import React from "react";
import { Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Icon from "../../partials/Icon/Icon";
import useAuth from "../../core/hooks/useAuth";

const Auth = React.memo(() => {
    const { user } = useAuth();

    return <div className="auth-page d-flex flex-wrap flex-sm-nowrap">
        <div className="left-side col-12 col-sm-6 d-none d-sm-block"></div>
        <div className="right-side col-12 col-sm-6 d-flex align-items-center justify-content-center flex-column">
            <Outlet />

            {!user &&
                <div className="col-8 my-3 text-align-center ">
                    <h6>Or authentify using</h6>
                    <div className="mt-3 d-flex gap-2 justify-content-center">
                        <Button variant="" size="sm">
                            <Icon type="brands" variant="facebook" size={2} />
                        </Button>
                        <Button variant="" size="sm">
                            <Icon type="brands" variant="google" size={2} />
                        </Button>
                    </div>
                </div>}
        </div>
    </div>
});

export default Auth;