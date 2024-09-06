import React from "react";
import { createPortal } from "react-dom";

type LogoProps = {
    isStatic?: boolean,
    className?: string,
}

const Logo = React.memo((props: LogoProps) => {
    const { isStatic = false, className = '' } = props;
    const element = React.useMemo(() => <i className={`logo ${className} ${isStatic && 'static'}`}></i>, [className, isStatic]);

    if (isStatic) {
        return element;
    }

    return createPortal(<div className="container logo-container">{element}</div>, document.body);
});

export default Logo;