import { motion } from "framer-motion";
import React from "react";
import { motionStatic } from "../../core/config/variants/variants";

type Props = {
    className: string,
    onSubmit?: React.FormEventHandler<HTMLFormElement>
} & React.PropsWithChildren;

const AuthForm = React.memo((props: Props) => {
    const { className, onSubmit, children } = props;

    return <motion.form className={`${className} d-flex flex-column align-items-center gap-3 col-12`}
        variants={motionStatic}
        onSubmit={onSubmit || undefined}
        initial="hidden"
        animate="visible"
        exit="hidden">
        {children}
    </motion.form>
})

export default AuthForm;