import React from "react";
import { createPortal } from "react-dom";

const CornerButtons = React.memo((props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const { className = '', ...divProps } = props;
    return createPortal(<div className={`corner-buttons d-flex gap-3 ${className}`} {...divProps} />, document.body)
});

export default CornerButtons;