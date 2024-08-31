import { AnimatePresence, motion} from "framer-motion";
import React from "react";
import { FloatingLabel, Form, FormControlProps } from "react-bootstrap";
import { FeedbackProps } from "react-bootstrap/esm/Feedback";
import { motionStatic } from "../../core/config/variants/variants";

type Props = {
    id: string,
    label: React.ReactNode,
    labelClassName?: string,
    error?: string,
} & FormControlProps & { Feedback?: FeedbackProps };

const FloatingForm = React.memo((props: Props) => {
    const { id, label, labelClassName, className = '', error, ...formControlProps } = props;

    return <FloatingLabel
        controlId={id}
        label={label}
        className={`text-dark ${labelClassName}`}>
        <Form.Control {...formControlProps} className={`text-dark ${className}`} isInvalid={Boolean(error)} as={motion.input} layout/>

        <AnimatePresence mode="popLayout">
            {error &&
                <Form.Control.Feedback
                    type="invalid"
                    as={motion.div}
                    variants={motionStatic}
                    exit="hidden"
                    initial="hidden"
                    animate="visible">
                    {error}
                </Form.Control.Feedback>}
        </AnimatePresence>

    </FloatingLabel>
});

export default FloatingForm;