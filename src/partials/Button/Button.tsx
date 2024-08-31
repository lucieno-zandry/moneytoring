import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { motionStatic } from "../../core/config/variants/variants";

type Props = {
    variant?: string,
    size?: 'sm' | 'lg',
    isLoading?: boolean,
}

export default (props: Props & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
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

export const MotionButton = React.memo((props: Props & HTMLMotionProps<"button">) => {
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

export const StaticMotionButton = React.memo((props: Props & HTMLMotionProps<"button">) => {
    return <MotionButton variants={motionStatic} initial="hidden" animate="visible" layout {...props} />
});

export const Button = {
    Motion: MotionButton,
    Static: StaticMotionButton,
}