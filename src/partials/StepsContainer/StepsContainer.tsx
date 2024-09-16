import { AnimatePresence, HTMLMotionProps, motion, Variants } from "framer-motion";
import React from "react";
import { motionStatic } from "../../core/config/variants/variants";

type Props = {
    Steps: unknown[],
    active: number,
    getComponent: (Step: any) => React.JSX.Element,
    variants: Variants
}

const StepsContainer = React.memo((props: Props & HTMLMotionProps<"div">) => {
    const { Steps, getComponent, active, variants = motionStatic, className = "", ...divProps } = props;

    return <AnimatePresence mode="popLayout">
        {Steps.map((Step, key) => {
            return active === key &&
                <motion.div
                    {...divProps}
                    key={key}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`step ${className}`}>
                    {getComponent(Step)}
                </motion.div>
        })}
    </AnimatePresence>
});

export default StepsContainer;