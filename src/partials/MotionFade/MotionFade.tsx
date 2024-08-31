import React from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { motionStatic } from "../../core/config/variants/variants";

type Props = {
    hidden?: boolean,
} & HTMLMotionProps<"div">

const MotionFade = React.memo((props: Props) => {
    const {
        hidden = false,
        variants = motionStatic,
        initial = 'hidden',
        animate = 'visible',
        exit = 'hidden',
        ...divProps
    } = props;

    return <AnimatePresence>
        {!hidden &&
            <motion.div
                variants={variants}
                initial={initial}
                animate={animate}
                exit={exit}
                {...divProps} />}
    </AnimatePresence>
});

export default MotionFade;