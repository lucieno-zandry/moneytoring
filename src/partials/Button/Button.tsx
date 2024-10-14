import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { motionStatic } from "../../core/config/variants/variants";
import { Link, LinkProps } from "react-router-dom";

export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'success' |
    'outline-primary' | 'outline-secondary' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark' | 'outline-success',
    size?: 'sm' | 'lg',
    isLoading?: boolean,
}

export default (props: ButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    const { variant, size, className = '', type = 'button', isLoading = false, children, ...buttonProps } = props;

    const variantClassName = React.useMemo(() => variant ? `btn-${variant}` : '', [variant]);
    const sizeClassName = React.useMemo(() => size ? `btn-${size}` : '', [size]);

    return <button
        className={`btn ${variantClassName} ${sizeClassName} ${className}`}
        type={type}
        disabled={isLoading}
        {...buttonProps}>
        {isLoading ? <span className="spinner-border spinner-border-sm" /> : children}
    </button>
}

export const ButtonLink = (props: ButtonProps & LinkProps) => {
    const { variant, size, className = '', isLoading = false, children, ...buttonProps } = props;

    const variantClassName = React.useMemo(() => variant ? `btn-${variant}` : '', [variant]);
    const sizeClassName = React.useMemo(() => size ? `btn-${size}` : '', [size]);

    return <Link
        className={`btn ${variantClassName} ${sizeClassName} ${className}`}
        {...buttonProps}>
        {isLoading ? <span className="spinner-border spinner-border-sm" /> : children}
    </Link>
}

export const MotionButton = React.memo((props: ButtonProps & HTMLMotionProps<"button">) => {
    const { variant, size, className = '', type = 'button', isLoading = false, children, ...buttonProps } = props;

    const variantClassName = React.useMemo(() => variant ? `btn-${variant}` : '', [variant]);
    const sizeClassName = React.useMemo(() => size ? `btn-${size}` : '', [size]);

    return <motion.button
        className={`btn ${variantClassName} ${sizeClassName} ${className} `}
        type={type}
        disabled={isLoading}
        {...buttonProps}>
        {isLoading ? <span className="spinner-border spinner-border-sm" /> : children}
    </motion.button>
});

export const StaticMotionButton = React.memo((props: ButtonProps & HTMLMotionProps<"button">) => {
    return <MotionButton
        variants={motionStatic}
        initial="hidden"
        animate="visible"
        layout
        {...props} />
});

export const Button = {
    Motion: MotionButton,
    Static: StaticMotionButton,
}