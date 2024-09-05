import React from "react";
import randomString from "../../core/helpers/randomString";

type Props = {
    label:  React.ReactNode,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Checkbox = React.forwardRef((props: Props, ref?: React.LegacyRef<HTMLDivElement>) => {
    const { label, className = '', id = '', ...inputProps} = props;
    const randomId = React.useMemo(() => randomString(6, 'checkbox'), []);
    
    return <div className={"checkbox " + className} ref={ref} >
        <input
            type='checkbox'
            id={id || randomId}
            {...inputProps} />
        <label htmlFor={id || randomId} tabIndex={0}>
            {label}
        </label>
    </div>
});

export default Checkbox;