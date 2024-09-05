import React from "react";

export type ModalBodyProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ModalBody = (props: ModalBodyProps) => {
    const { className = '', ...divProps } = props;

    return <div
        className={`modal-body ${className}`}
        {...divProps} />
}

export default ModalBody;