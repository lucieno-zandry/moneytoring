import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import throttle from "../helpers/throttle";
import { dashboard, loginPage } from "../config/links/pages";

type Intended = {
    pathname: string;
    condition: boolean;
};

type RedirectOptions = {
    otherRedirections: { pathname: string, condition: boolean, target: boolean }[],
}

const PATHNAMEINTENDED = "PATHNAMEINTENDED";

const DEFAULT_REDIRECT_OPTIONS: RedirectOptions = {
    otherRedirections: []
}

const pages = {
    authenticatedHomepage: dashboard,
    loginPage
}

const clearIntended = () => {
    sessionStorage.removeItem(PATHNAMEINTENDED);
};

const setIntended = (condition: boolean, pathname?: string) => {
    sessionStorage.setItem(
        PATHNAMEINTENDED,
        JSON.stringify({ condition, pathname })
    );
};

const getIntended = (): Intended | null => {
    const intended = sessionStorage.getItem(PATHNAMEINTENDED);
    if (!intended) return null;
    return JSON.parse(intended);
};

export default function (target: boolean, authState: boolean, options: RedirectOptions = DEFAULT_REDIRECT_OPTIONS) {
    const { pathname } = useLocation();
    const { otherRedirections } = options;

    const navigate = useNavigate();

    const redirect = React.useCallback(
        (pathname?: string) =>
            throttle(() => {
                pathname = pathname || getIntended()!.pathname;
                clearIntended();
                navigate(pathname);
            }, 1000),
        []
    );

    const otherRedirection = React.useMemo(() => {
        if (otherRedirections.length > 0) {
            for (let otherRedirection of otherRedirections) {
                if (otherRedirection.target === target && otherRedirection.condition && otherRedirection.pathname !== pathname) {
                    return otherRedirection;
                }
            }
        }

        return null;
    }, [otherRedirections, target, pathname]);

    React.useEffect(() => {
        if (target !== authState) {
            setIntended(target, pathname);

            if (otherRedirection) {
                redirect(otherRedirection.pathname);
            } else {
                const destination = target ? pages.loginPage : pages.authenticatedHomepage;
                redirect(destination);
            }
        }
    }, [target, authState, pathname, otherRedirection]);

    React.useEffect(() => {
        const intended = getIntended();

        if (intended && intended.pathname !== pathname) {
            redirect(intended.pathname);
            return;
        }

        if (otherRedirection) {
            redirect(otherRedirection.pathname);
            return;
        }

    }, [pathname, authState, otherRedirection]);

    return redirect;
}
