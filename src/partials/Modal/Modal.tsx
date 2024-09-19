import React from "react";
import ModalContainer, { ModalContainerProps } from "./Container/Container";
import ModalButton from "./Button/Button";
import ModalHeader, { ModalHeaderProps } from "./Header/Header";
import ModalBody from "./Body/Body";
import ModalFooter, { ModalFooterProps } from "./Footer/Footer";
import { HTMLTag } from "../HTMLElement/HTMLElement";

export type ModalBundle = {
    Container: <T extends HTMLTag>(props: ModalContainerProps<T>) => JSX.Element;
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

export const ModalContext = React.createContext<ModalContainerProps<HTMLTag>>({
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

    const Container = React.useCallback(<T extends HTMLTag>(props: ModalContainerProps<T>) => (
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