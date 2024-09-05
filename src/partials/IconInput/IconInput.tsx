import React from "react";
import randomString from "../../core/helpers/randomString";
import Icon, { IconProps } from "../Icon/Icon";

type IconInput = {
    iconProps: IconProps,
    labelProps?: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function (props: IconInput) {
    const { iconProps, labelProps, ...inputProps } = props;
    const inputId = React.useMemo(() => randomString(6, 'icon-input'), []);

    return <>
        <label
            {...labelProps}
            htmlFor={inputId}
            className={`btn btn-${props.checked ? 'primary' : 'outline-light'} ${labelProps?.className}`}
            tabIndex={0}>
            <Icon {...iconProps}/>
        </label>

        <input
            {...inputProps}
            type="radio"
            name="icon"
            className="icon-input"
            id={inputId}
            value={iconProps.variant}
            hidden
        />
    </>
}