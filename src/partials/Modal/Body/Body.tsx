import React from "react";

const ModalBody = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const { className = '', ...divProps } = props;

    return <div
        className={`modal-body ${className}`}
        {...divProps} />
}

export default ModalBody;