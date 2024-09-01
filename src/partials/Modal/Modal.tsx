import React from "react";
import ModalContainer, { ModalContainerProps } from "./Container/Container";
import ModalButton from "./Button/Button";
import ModalHeader, { ModalHeaderProps } from "./Header/Header";
import ModalBody from "./Body/Body";
import ModalFooter, { ModalFooterProps } from "./Footer/Footer";

export type ModalBundle = {
    Container: (props: ModalContainerProps) => JSX.Element;
    Toggle: (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => JSX.Element;
    Header: (props: ModalHeaderProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element;
    Body: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element;
    Footer: (props: ModalFooterProps) => JSX.Element;
}

export type Position = {
    x: number;
    y: number;
}

export const defaultPosition: Position = {
    x: 0,
    y: 0,
}

export const ModalContext = React.createContext<ModalContainerProps>({
    show: false,
    onClose: () => { },
})

export const useModalContext = () => {
    return React.useContext(ModalContext);
}

export const useModal = (): ModalBundle => {
    const [state, setState] = React.useState({
        position: defaultPosition,
    });

    const setPosition = React.useCallback((position: Position) => {
        setState(s => ({ ...s, position }));
    }, []);

    const Container = React.useCallback((props: ModalContainerProps) => (
        <ModalContainer position={state.position} {...props} />
    ), [state.position]);

    const Toggle = React.useCallback((props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
        <ModalButton setPosition={setPosition} {...props} />
    ), [setPosition]);

    return {
        Container,
        Toggle,
        Header: ModalHeader,
        Body: ModalBody,
        Footer: ModalFooter,
    }
}

export { ModalButton, ModalContainer, ModalBody, ModalFooter, ModalHeader };
export default ModalContainer;