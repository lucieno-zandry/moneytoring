import React from "react";
import { Form, FormControlProps } from "react-bootstrap";
import { motion } from 'framer-motion';
import useNumberFormat from "../../../core/hooks/useNumberFormat";

export default React.memo((props: FormControlProps) => {
    const { type = 'text', className = '', onChange, ...formControlProps } = props;

    const { toNumber, toString } = useNumberFormat();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {

        if (type === "number") {
            const { value } = e.target;
            const numberValue = toNumber(value);

            e.target.value = isNaN(numberValue) ? "0" : toString(numberValue);
        }

        onChange && onChange(e);
    }, [type, onChange, toNumber, toString]);

    const inputType = React.useMemo(() => type === "number" ? "text" : type, [type]);

    return <Form.Control
        {...formControlProps}
        className={`text-dark ${className}`}
        as={motion.input}
        type={inputType}
        onChange={handleChange}
        layout />
});