import React from "react";
import ModalContainer, { ModalContainerProps } from "./Container/Container";
import ModalButton, { ModalButtonProps } from "./Button/Button";
import ModalHeader, { ModalHeaderProps } from "./Header/Header";
import ModalBody from "./Body/Body";
import ModalFooter, { ModalFooterProps } from "./Footer/Footer";
import { HTMLTag } from "../HTMLElement/HTMLElement";

// Types for Modal bundle
export type ModalBundle = {
    Container: <T extends HTMLTag>(
        props: ModalContainerProps<T>
    ) => JSX.Element;
    Toggle: (
        props: ModalButtonProps
    ) => JSX.Element;
    Header: (
        props: ModalHeaderProps &
            React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            >
    ) => JSX.Element;
    Body: (
        props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    ) => JSX.Element;
    Footer: (props: ModalFooterProps) => JSX.Element;
};

// Position type and default position
export type Position = {
    x: number;
    y: number;
};

export const defaultPosition: Position = {
    x: 0,
    y: 0,
};

// Modal Context
export const ModalContext = React.createContext<ModalContainerProps<HTMLTag>>({
    show: false,
    onClose: () => { },
});

export const useModalContext = () => {
    return React.useContext(ModalContext);
};

// Hook that returns modal bundle
export const useModal = (): ModalBundle => {
    const [state, setState] = React.useState({
        position: defaultPosition,
    });

    const setPosition = React.useCallback((position: Position) => {
        setState((s) => ({ ...s, position }));
    }, []);

    const Container = React.useCallback(
        <T extends HTMLTag>(props: ModalContainerProps<T>) => (
            <ModalContainer position={state.position} {...props} />
        ),
        [state.position]
    );

    const Toggle = React.useCallback(
        (
            props: ModalButtonProps
        ) => <ModalButton setPosition={setPosition} {...props} />,
        [setPosition]
    );

    return {
        Container,
        Toggle,
        Header: ModalHeader,
        Body: ModalBody,
        Footer: ModalFooter,
    };
};

// Modal component that exposes subcomponents
const Modal: React.FC<ModalContainerProps<HTMLTag>> & {
    Button: typeof ModalButton;
    Header: typeof ModalHeader;
    Body: typeof ModalBody;
    Footer: typeof ModalFooter;
} = (props) => {
    return <ModalContainer {...props} />;
};

Modal.Button = ModalButton;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export { ModalButton, ModalContainer, ModalBody, ModalFooter, ModalHeader };
export default Modal;
