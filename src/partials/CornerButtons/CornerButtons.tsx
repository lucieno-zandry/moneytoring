import React from "react";
import { createPortal } from "react-dom";

type CornerButtonsProps = {
    position?: 'start' | 'end',
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const CornerButtons = React.memo((props: CornerButtonsProps) => {
    const { className = '', position = 'end', ...divProps } = props;
    return <div className={`corner-buttons d-flex gap-3 ${className} ${position}`} {...divProps} />
});

export default CornerButtons;