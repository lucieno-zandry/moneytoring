import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { motionStatic } from "../../../core/config/variants/variants";

const MotionDiv = React.memo((props: HTMLMotionProps<"div">) => {
    return <motion.div
        variants={motionStatic}
        initial="hidden"
        animate="visible"
        exit="hidden"
        {...props} />
});

export default MotionDiv;