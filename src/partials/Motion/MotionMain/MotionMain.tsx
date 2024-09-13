import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { motionStatic } from "../../../core/config/variants/variants";

const MotionMain = React.memo((props: HTMLMotionProps<"main">) => {
    return <motion.main
        variants={motionStatic}
        initial="hidden"
        animate="visible"
        exit="hidden"
        {...props}
        className={`mx-2 ${props.className}`}
    />
});

export default MotionMain;