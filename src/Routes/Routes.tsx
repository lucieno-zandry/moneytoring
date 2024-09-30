import React from "react";
import { AnimatePresence } from "framer-motion";
import App from "../App/App";
import useAuth from "../core/hooks/useAuth";
import AuthOnly from "./AuthOnly";
import GuestOnly from "./GuestOnly";

const AppRoutes = React.memo(() => {
    const { user } = useAuth();

    return <App>
        <AnimatePresence mode="wait">
            {user ? <AuthOnly /> : <GuestOnly />}
        </AnimatePresence>
    </App>
});

export default AppRoutes;