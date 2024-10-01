import React from "react";
import { AnimatePresence } from "framer-motion";
import App from "../App/App";
import AuthOnly from "./AuthOnly";
import GuestOnly from "./GuestOnly";

const AppRoutes = React.memo(() => {

    return <App>
        <AnimatePresence mode="wait">
            <AuthOnly />
            <GuestOnly />
        </AnimatePresence>
    </App>
});

export default AppRoutes;