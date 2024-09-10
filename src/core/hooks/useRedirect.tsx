import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as links from "../config/links/pages";
import useAuth from "./useAuth";

type SessionIntended = { target: null | boolean, path: string }
const { authPage, emailConfirmation, loginPage } = links;

const notApplicablePaths = [
    loginPage,
    authPage,
    emailConfirmation,
];

function setSessionIntended(pathname: string, target: boolean) {
    const intended = {
        path: pathname,
        target
    }

    sessionStorage.setItem('intended', JSON.stringify(intended));
}

function getSessionIntended(): SessionIntended | null {
    const existingIntended: null | string = sessionStorage.getItem('intended');
    const sessionIntended: SessionIntended = existingIntended && JSON.parse(existingIntended);

    return sessionIntended;
}

export function useRedirect(target: boolean): Function {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useAuth(state => state);
    const sessionIntended = getSessionIntended();

    const goToIntended = React.useCallback((path: string) => {
        sessionStorage.removeItem('intended');
        navigate(path);
    }, [navigate]);

    const redirect = useCallback(() => {
        if (sessionIntended?.target === !!user) {
            goToIntended(sessionIntended.path);
        } else {
            target ? navigate(loginPage) : navigate(authPage);
        }
    }, [sessionIntended, navigate, target, goToIntended]);

    useEffect(() => {
        if (!!user !== target && !notApplicablePaths.includes(location.pathname)) {
            setSessionIntended(location.pathname, target);
        }
    }, [target, location.pathname]);

    useEffect(() => {
        if (user) {
            if (user.email_verified_at === null) {
                if (location.pathname !== emailConfirmation) {
                    navigate(emailConfirmation);
                    return;
                }
            } else {
                if (location.pathname === emailConfirmation) {
                    redirect();
                    return;
                }
            }
        }

        if (!!user !== target) {
            redirect();
            return;
        }
    }, [user, location.pathname, target, redirect]);

    return redirect;
}