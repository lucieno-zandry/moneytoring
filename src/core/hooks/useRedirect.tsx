import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as links from "../config/links/pages";
import useAuth from "./useAuth";
import useAccounts from "./useAccounts";
import useCategories from "./useCategories";

type SessionIntended = { target: null | boolean, path: string }
const { authPage, emailConfirmation, loginPage } = links;

const notApplicablePaths = [
    loginPage,
    authPage,
    emailConfirmation,
    links.accountsSetup,
    links.categoriesSetup
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

    const { user } = useAuth();
    const { accounts } = useAccounts();
    const { categories } = useCategories();

    const customRedirections = React.useMemo(() => [
        {
            condition: user && user.email_verified_at === null,
            pathname: emailConfirmation,
        },
        {
            condition: accounts && accounts.length === 0,
            pathname: links.accountsSetup,
        },
        {
            condition: categories && categories.length === 0,
            pathname: links.categoriesSetup,
        }
    ], [user, accounts, categories]);

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
            for (let customRedirection of customRedirections) {
                if (customRedirection.condition && location.pathname !== customRedirection.pathname) {
                    navigate(customRedirection.pathname);
                    return;
                }
            }
        }

        if (!!user !== target) {
            redirect();
            return;
        }
    }, [user, location.pathname, customRedirections]);

    return redirect;
}