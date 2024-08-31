import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";
import { motionStatic } from "../../core/config/variants/variants";

type Props = {
    Steps: unknown[],
    active: number,
    getComponent: (Step: any) => React.JSX.Element,
    variants: Variants
}

const StepsContainer = React.memo((props: Props) => {
    const { Steps, getComponent, active, variants = motionStatic} = props;

    return <AnimatePresence mode="popLayout">
        {Steps.map((Step, key) => {
            return active === key &&
                <motion.div
                    key={key}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="step d-flex align-items-center gap-3 col-12 flex-column text-align-center">
                    {getComponent(Step)}
                </motion.div>
        })}
    </AnimatePresence>
});

export default StepsContainer;