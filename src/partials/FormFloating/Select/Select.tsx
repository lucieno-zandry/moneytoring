import React from "react";
import { Form, FormSelectProps } from "react-bootstrap";

export type SelectProps<T> = {
    options: T[],
    predicate: (option: T) => ({ value: string | number, title: string | number } | (string | number))
} & FormSelectProps;

export default React.memo((props: SelectProps<any>) => {
    const {
        options,
        predicate,
        className = '',
        ...formSelectProps
    } = props;

    return <Form.Select className={`text-dark ${className}`} {...formSelectProps}>
        {options.map((option, key) => {
            let data = predicate(option);
            let value: string | number;
            let title: string | number;

            if (typeof data === 'object') {
                value = data.value;
                title = data.title;
            }else{
                title = value = data;
            }

            return <option
                value={value}
                key={key}>
                {title}
            </option>
        })}
    </Form.Select>
})