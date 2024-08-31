import { motion } from "framer-motion";
import React from "react";
import { Form } from "react-bootstrap";
import { motionStatic } from "../../core/config/variants/variants";

type Props = {
    className: string,
    onSubmit?: React.FormEventHandler<HTMLFormElement>
} & React.PropsWithChildren;

const AuthForm = React.memo((props: Props) => {
    const { className, onSubmit, children } = props;

    return <Form className={`${className} d-flex flex-column align-items-center gap-3 col-12`} as={motion.form}
        variants={motionStatic}
        onSubmit={onSubmit || undefined}
        initial="hidden"
        animate="visible"
        exit="hidden">
        {children}
    </Form>
})

export default AuthForm;