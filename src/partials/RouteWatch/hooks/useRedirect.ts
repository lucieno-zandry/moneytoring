import React from "react";
import { RedirectOptions } from "../config/types";
import { useLocation, useNavigate } from "react-router-dom";
import setIntended from "../functions/setIntended";
import throttle from "../functions/throttle";
import getIntended from "../functions/getIntended";
import clearIntended from "../functions/clearIntended";

export default function (authState: boolean, options?: RedirectOptions) {
  const { otherRedirections = [] } = options || {};

  const location = useLocation();
  const navigate = useNavigate();

  const findOtherRedirection = React.useCallback(
    () => otherRedirections.find(({ condition }) => condition),
    [otherRedirections, authState]
  );

  const goAround = React.useCallback(
    (condition: boolean, pathname: string) => {
      setIntended(condition, location.pathname);
      navigate(pathname);
    },
    [location.pathname]
  );

  const redirect = React.useCallback(() => {
    const intended = getIntended();

    if (
      intended &&
      intended.condition === authState &&
      location.pathname !== intended.pathname
    ) {
      const pathname = intended.pathname;
      clearIntended();
      navigate(pathname);
    }
  }, [authState, location.pathname]);

  React.useEffect(() => {
    if (!options) return;
    const { requiredState, loginPage, authenticatedHomepage } = options;

    throttle(() => {
      const otherRedirection = findOtherRedirection();

      if (otherRedirection) {
        if (otherRedirection.pathname !== location.pathname) {
          navigate(otherRedirection.pathname);
        }
        return;
      }

      if (options.requiredState !== authState) {
        const pathname = requiredState ? loginPage : authenticatedHomepage;
        if (location.pathname !== pathname) {
          goAround(options.requiredState, pathname);
        }
        return;
      }

      const shouldRedirectFromOtherRedirection =
        !otherRedirection &&
        otherRedirections.some(
          ({ condition, pathname }) =>
            !condition && pathname === location.pathname
        );

      if (shouldRedirectFromOtherRedirection) {
        navigate(authState ? authenticatedHomepage : loginPage);
        return;
      }

      redirect();
    }, 500);
  }, [
    findOtherRedirection,
    location.pathname,
    goAround,
    options,
    redirect,
    authState,
    otherRedirections,
  ]);

  return redirect;
}
