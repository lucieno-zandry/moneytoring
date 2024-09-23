import React from "react";
import { createPortal } from "react-dom";

type LogoProps = {
    isStatic?: boolean,
    className?: string,
}

const Logo = React.memo((props: LogoProps) => {
    const { isStatic = true, className = '' } = props;

    const element = React.useMemo(() => <div
        className={`logo ${className} ${!isStatic && 'container logo-container'}`}>
        <i className="logo-icon" />
        <span className="logo-text">
            MoneyToring
        </span>
    </div>, [className, isStatic]);

    if (isStatic) {
        return element;
    }

    return createPortal(element, document.body);
});

export default Logo;