import React from "react";
import { Form, FormControlProps } from "react-bootstrap";
import { motion } from 'framer-motion';

export default React.memo((props: FormControlProps) => {
    const { type = 'text', className = '', onChange, ...formControlProps } = props;

    const handleNumberChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let formatedValue = e.target.value;

        if (formatedValue) {
            formatedValue = formatedValue.replace(/[^0-9]/g, '');
        }

        if (!isNaN(parseInt(formatedValue))) {
            e.target.value = formatedValue;
            onChange && onChange(e);
        }
    }, [onChange]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        if (!onChange) return;

        if (type === 'number') return handleNumberChange(e);
        
        onChange(e);

    }, [type, onChange, handleNumberChange]);

    return <Form.Control
        {...formControlProps}
        className={`text-dark ${className}`}
        as={motion.input}
        type={type}
        onChange={handleChange}
        layout />
});