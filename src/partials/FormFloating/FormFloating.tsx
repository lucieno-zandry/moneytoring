import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { FloatingLabel, FloatingLabelProps, Form, FormControlProps } from "react-bootstrap";
import { motionStatic } from "../../core/config/variants/variants";
import Input from "./Input/Input";
import Select, { SelectProps } from "./Select/Select";

type Props = {
    id: string,
    error?: string,
    labelProps: FloatingLabelProps,
}

function FloatingWrapper(props: Props & PropsWithChildren) {
    const { id, labelProps, error, children } = props;
    const { className = '' } = labelProps;

    return <FloatingLabel
        {...labelProps}
        controlId={id}
        className={`text-dark ${className}`}>
        {children}

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
}

const FloatingInput = (props: Props & FormControlProps) => {
    const { id, labelProps, error, ...inputProps } = props;

    return <FloatingWrapper
        id={id}
        labelProps={labelProps}
        error={error}>
        <Input {...inputProps} isInvalid={Boolean(error)}/>
    </FloatingWrapper>
}

const FloatingSelect = (props: Props & SelectProps<any>) => {
    const { id, labelProps, error, ...selectProps } = props;

    return <FloatingWrapper
        id={id}
        labelProps={labelProps}
        error={error}>
        <Select {...selectProps} isInvalid={Boolean(error)}/>
    </FloatingWrapper>
}

const FloatingTextArea = (props: Props & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) => {
    const { id, labelProps, error, className = '', ...textareaProps } = props;

    return <FloatingWrapper
        id={id}
        labelProps={labelProps}
        error={error}>
        <textarea
            {...textareaProps}
            className={`form-control text-dark ${className} ${error && 'is-invalid'}`}
            id={id} />
    </FloatingWrapper>
}

const FormFloating = {
    Input: FloatingInput,
    Select: FloatingSelect,
    TextArea: FloatingTextArea,
}

export default FormFloating;