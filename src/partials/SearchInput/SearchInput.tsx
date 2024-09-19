import React from "react";
import randomString from "../../core/helpers/randomString";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

export type SearchInputProps = {
    containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default React.memo((props: SearchInputProps) => {
    const { containerProps = {}, className = '', ...inputProps } = props;

    return <div {...containerProps} className={`input-group d-flex flex-nowrap ${containerProps.className}`} >
        <input
            id={randomString(5, 'search-input')}
            placeholder="search"
            {...inputProps}
            className={`form-control text-secondary bg-dark border-secondary ${className}`}
            type="text"
        />
        <Button variant="secondary"><Icon type="solid" variant="search" /></Button>
    </div>
})