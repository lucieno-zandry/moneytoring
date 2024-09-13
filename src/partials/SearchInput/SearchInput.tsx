import randomString from "../../core/helpers/randomString";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

export type SearchInputProps = {
    containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function (props: SearchInputProps) {
    const { containerProps = {}, className = '', ...inputProps } = props;

    return <div {...containerProps} className={`input-group flex-nowrap ${containerProps.className} d-none d-sm-flex`} >
        <input
            id={randomString(5, 'search-input')}
            placeholder="search"
            {...inputProps}
            className={`form-control ${className}`}
            type="text"
        />
        <Button variant="secondary"><Icon type="solid" variant="search" /></Button>
    </div>
}