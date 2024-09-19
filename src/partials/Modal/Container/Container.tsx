import React from "react";
import randomString from "../../../core/helpers/randomString";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { createPortal } from "react-dom";
import { defaultPosition, ModalContext, Position } from "../Modal";
import HTMLElement, { HTMLElementProps, HTMLTag } from "../../HTMLElement/HTMLElement";

export interface ModalContainerProps<T extends HTMLTag> extends HTMLElementProps<T> {
    show?: boolean,
    onClose?: () => void,
    size?: 'sm' | 'md' | 'lg',
    align?: 'center' | 'end' | 'start',
}

interface Target extends EventTarget {
    id: string,
}

const defaultVariants = {
    hidden: {
        y: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        transition: {
            backgroundColor: {
                duration: .3,
                type: 'tween',
                ease: 'easeInOut',
            },
            y: {
                delay: .3,
                duration: .6,
                type: 'spring',
            }
        }
    },
    visible: {
        y: 10,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        transition: {
            backgroundColor: {
                duration: .5,
                delay: .3,
                type: 'tween',
                ease: 'easeInOut',
            },
            y: {
                type: 'spring',
                duration: .6,
            }
        }
    }
}

const getVariants: (x: number, y: number) => Variants = (x, y) => ({
    hidden: {
        x,
        y,
        scale: 0,
        transformOrigin: 'top left',
        backgroundColor: defaultVariants.hidden.backgroundColor,
        transition: {
            delay: .3,
            backgroundColor: defaultVariants.hidden.transition.backgroundColor,
        }
    },
    visible: {
        ...defaultPosition,
        scale: 1,
        backgroundColor: defaultVariants.visible.backgroundColor,
        transition: {
            duration: .5,
            type: 'spring',
            backgroundColor: defaultVariants.visible.transition.backgroundColor,
        }
    }
});

const ModalContainer = <T extends HTMLTag>(props: ModalContainerProps<T> & { position?: Position }) => {
    const {
        show = false,
        onClose,
        position,
        className = '',
        size = 'md',
        align = 'center',
        ...elementProps } = props;

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

    const variants = React.useMemo(() => {
        if (!position) return defaultVariants;
        return getVariants(position.x, position.y)
    }, [position]);

    const component = React.useMemo(() => <motion.div
        id={modalId}
        className={`modal ${show && 'show'} ${size} ${align}`}
        onClick={handleClick}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        tabIndex={-1}>
        <HTMLElement className={`modal-content ${className}`} {...elementProps} />
    </motion.div>, [handleClick, Element, modalId, show, variants, className, elementProps]);

    const contextValue: ModalContainerProps<'div'> = React.useMemo(() => ({
        show,
        onClose
    }), [show, onClose]);

    return createPortal(<ModalContext.Provider value={contextValue}>
        <AnimatePresence>
            {show && component}
        </AnimatePresence>
    </ModalContext.Provider>, document.body);
}

export default ModalContainer;