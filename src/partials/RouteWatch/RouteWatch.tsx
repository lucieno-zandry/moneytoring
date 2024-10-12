import { Outlet } from "react-router-dom";
import useRedirect from "./hooks/useRedirect";

export type RouteShieldProps = {
    otherRedirections?: { pathname: string, condition: boolean }[],
    authState: boolean,
    requiredState: boolean,
    loginPage: string,
    authenticatedHomepage: string,
}

const RouteWatch = (props: RouteShieldProps) => {
    const { otherRedirections, authState, requiredState, authenticatedHomepage, loginPage } = props;

    useRedirect(authState, { otherRedirections, loginPage, authenticatedHomepage, requiredState });

    if (requiredState === authState) {
        return <Outlet />
    }
};

export default RouteWatch;