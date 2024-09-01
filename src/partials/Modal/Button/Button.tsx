import React from "react";
import { Position } from "../Modal";

export type ModalButtonProps = {
    setPosition: (position: Position) => void,
}

export default function ModalButton(props: ModalButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const { onClick, setPosition, ...buttonProps } = props;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback((e) => {
        const { clientX, clientY } = e;

        setPosition({
            x: clientX,
            y: clientY
        });

        onClick && onClick(e);
    }, [onClick]);

    return <button onClick={handleClick} {...buttonProps} />
}