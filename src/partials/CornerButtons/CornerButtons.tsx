import React from "react";
import { createPortal } from "react-dom";

type CornerButtonsProps = {
    position?: 'start' | 'end',
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const CornerButtons = React.memo((props: CornerButtonsProps) => {
    const { className = '', position = 'end', ...divProps } = props;
    return createPortal(<div className={`corner-buttons gap-3 align-items-center ${className} ${position}`} {...divProps} />, document.body)
});

export default CornerButtons;