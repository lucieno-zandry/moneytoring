import React from "react";
import { Position } from "../Modal";

export type ModalButtonProps = {
    show: boolean,
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function ModalButton(props: ModalButtonProps & { setPosition: (position: Position) => void }) {
    const {
        onClick,
        setPosition,
        show = false,
        ...buttonProps } = props;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback((e) => {
        const { clientX, clientY } = e;

        setPosition({
            x: clientX,
            y: clientY
        });

        onClick && onClick(e);
    }, [onClick]);

    const transition = React.useMemo(() => show ? undefined : "opacity .1s ease-in-out .5s", [show]);

    return <button
        onClick={handleClick}
        {...buttonProps}
        style={{ opacity: show ? 0 : 1, transition: transition }} />
}