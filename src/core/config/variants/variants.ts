import { Variants } from "framer-motion";

const transition = {
    duration: .5,
    type: 'spring',
}

export const motionStatic: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: .5,
        }
    }
}

export const slideMotion = {
    right: {
        x: '100%',
        transition
    },
    center: {
        x: 0,
        transition
    },
    left: {
        x: '-100%',
        transition
    }
}

export const slideNext: Variants = {
    hidden: slideMotion.right,
    visible: slideMotion.center,
    exit: slideMotion.left
}

export const slidePrevious: Variants = {
    hidden: slideMotion.left,
    visible: slideMotion.center,
    exit: slideMotion.right
}