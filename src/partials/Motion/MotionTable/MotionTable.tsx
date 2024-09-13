import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { motionStatic } from "../../../core/config/variants/variants";

const MotionTable = React.memo((props: HTMLMotionProps<"table">) => {
    return <motion.table
        variants={motionStatic}
        initial="hidden"
        animate="visible"
        exit="hidden"
        {...props} />
});

export default MotionTable;