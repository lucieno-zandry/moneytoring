import React from "react";

type LogoProps = {
    isStatic?: boolean,
    className?: string,
}

const Logo = React.memo((props: LogoProps) => {
    const { isStatic = false, className = ''} = props;
    return <i className={`logo ${className} ${isStatic && 'static'}`}></i>
});

export default Logo;