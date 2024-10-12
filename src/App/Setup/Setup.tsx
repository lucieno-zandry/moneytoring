import React from "react";
import Logo from "../../partials/Logo/Logo";
import { Outlet, useLocation } from "react-router-dom";

const getElement = () => document.querySelector<HTMLDivElement>("#app-setup");

const Setup = () => {

    const location = useLocation();

    React.useEffect(() => {
        const element = getElement();
        if (!element) return;
        
        element.style.overflowX = 'hidden';
        setTimeout(() => {
            element.style.overflowX = 'auto';
        }, 2000);
    }, [location.pathname]);

    return <div className="setup" id="app-setup">
        <Logo isStatic={false} />
        <Outlet />
    </div>
}

export default Setup;