import { AnimatePresence, Variants, motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
import randomString from "../../core/helpers/randomString";

interface Target extends EventTarget {
    id: string,
}

export type ModalContainerProps = {
    show?: boolean,
    onClose?: Function,
}

export type ModalBundle = {
    Container: (props: ModalContainerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element;
    Toggle: (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => JSX.Element;
    Header: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element;
    Body: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element;
    Footer: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element;
}

type Position = {
    x: number;
    y: number;
}


type ModalButtonProps = {
    setPosition: (position: Position) => void,
}

const defaultPosition: Position = {
    x: 0,
    y: 0,
}

const getVariants: (x: number, y: number) => Variants = (x, y) => ({
    hidden: {
        x,
        y,
        scale: 0,
        transformOrigin: 'top left',
    },
    visible: {
        ...defaultPosition,
        scale: 1,
        transition: {
            duration: .5,
            type: 'spring',
        }
    }
});

const ModalContext = React.createContext<ModalContainerProps>({
    show: false,
    onClose: () => { },
})

const useModalContext = () => {
    return React.useContext(ModalContext);
}

export function ModalButton(props: ModalButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
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

export const ModalHeader = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const { className = '', ...divProps } = props;

    return <div
        className={`modal-header ${className}`}
        {...divProps} />
}

export const ModalBody = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const { className = '', ...divProps } = props;

    return <div
        className={`modal-body ${className}`}
        {...divProps} />
}

export const ModalFooter = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const { className = '', ...divProps } = props;

    return <div
        className={`modal-footer ${className}`}
        {...divProps} />
}

const ModalContainer = (props: ModalContainerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { position: Position }) => {
    const { show = false, onClose, position, className = '', ...divProps } = props;

    const modalId = React.useMemo(() => randomString(6, 'modal'), []);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback((e) => {
        const target = e.target as Target;

        if (target.id === modalId) {
            onClose && onClose();
        }
    }, [onClose]);

    const closeModal = React.useCallback(() => show && onClose && onClose(), [show, onClose]);

    const keyupListener = React.useCallback((e: KeyboardEvent) => {
        const { key } = e;

        const closeKeys = [
            'Escape',
        ]

        if (closeKeys.includes(key)) {
            closeModal();
        }
    }, [closeModal]);

    React.useEffect(() => {
        if (show) {
            window.addEventListener('keyup', keyupListener);
        }

        return () => {
            window.removeEventListener('keyup', keyupListener);
        }
    }, [show, keyupListener]);

    const variants = React.useMemo(() => getVariants(position.x, position.y), [position]);

    const component = React.useMemo(() => <motion.div
        id={modalId}
        className={`modal ${show && 'show'}`}
        onClick={handleClick}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        tabIndex={-1}>
        <div className={`modal-content ${className}`} {...divProps} />
    </motion.div>, [handleClick]);

    const contextValue: ModalContainerProps = React.useMemo(() => ({
        show,
        onClose
    }), [show, onClose]);

    return createPortal(<ModalContext.Provider value={contextValue}>
        <AnimatePresence>
            {show && component}
        </AnimatePresence>
    </ModalContext.Provider>, document.body);
}

export const useModal = (): ModalBundle => {
    const [state, setState] = React.useState({
        position: defaultPosition,
    });

    const setPosition = React.useCallback((position: Position) => {
        setState(s => ({ ...s, position }));
    }, []);

    const Container = React.useCallback((props: ModalContainerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
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

export default ModalContainer;