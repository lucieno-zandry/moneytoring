import React from "react";
import { HTMLMotionProps, motion, Variants } from 'framer-motion';

interface SectionProps extends HTMLMotionProps<'div'> {
    selfProps?: React.HTMLAttributes<HTMLDivElement>,
    intersectionObserverOptions?: IntersectionObserverInit,
}

const variants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: .5,
            when: 'beforeChildren',
            duration: 1,
            type: 'tween'
        }
    }
}

const Section = React.memo((props: SectionProps) => {
    const { id, selfProps = {}, intersectionObserverOptions, ...divProps } = props;
    const { className = '', ...rest } = selfProps;


    return (
        <div
            className={`section d-flex px-2 px-md-5 ${className}`}
            id={id}
            {...rest}>
            <motion.div variants={variants}
                initial="hidden"
                whileInView="visible"
                {...divProps} />
        </div>
    );
});

export default Section;
