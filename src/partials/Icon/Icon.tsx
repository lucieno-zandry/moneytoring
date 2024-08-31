import React from "react";

type IconType = 'classic' | 'solid' | 'regular' | 'light' | 'thin' | 'brands';
type Size = 1 | 2 | 3 | 4;
type Variant = string;

type Props = {
    variant: Variant,
    type?: IconType,
    size?: Size,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

const brands = [
    'linkedin',
    'github',
    'facebook',
];

const Icon = React.memo((props: Props) => {
    const {
        type = brands.includes(props.variant) ? 'brands' : 'regular',
        size = 1,
        variant,
        className = '',
        ...elementProps
    } = props;

    return <i
        className={`fa-${type} fa-${variant} fa-${size}x ${className}`}
        {...elementProps}></i>
});

export default Icon;