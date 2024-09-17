import React from "react";
import { useLocation } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { NavItem, NavItemProps } from "../NavItem/NavItem";
import classList from "../../core/helpers/classList";

type NavProps = {
    children: NavItemProps[],
    vertical?: boolean,
    width?: string,
    height?: string,
    cursorThickness?: string,
    centered?: boolean,
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'children'>

let previousIndex = 0;

export default React.memo((props: NavProps) => {

    const {
        className = '',
        children,
        vertical = false,
        height = '3rem',
        width = `${100 / props.children.length}%`,
        cursorThickness = '2px',
        centered = false,
        ...navProps } = props;

    const location = useLocation();

    const active = React.useMemo(() => {
        const index = children.findIndex(navItem => navItem.href === location.pathname);
        return index;
    }, [children, location.pathname]);

    const variants: Variants = React.useMemo(() => {
        const key = vertical ? 'top' : 'left';
        const side = vertical ? height : width;

        return {
            initial: {
                [key]: `calc(${side} * ${previousIndex})`
            },
            animate: {
                [key]: `calc(${side} * ${active})`
            }
        }
    }, [active, vertical, height, width]);

    const style = React.useMemo(() => ({
        width: vertical ? cursorThickness : width,
        height: vertical ? height : cursorThickness,
    }), [vertical, height, width, cursorThickness]);

    const center = React.useMemo(() => {
        if (centered) {
            return "align-items-center justify-content-center";
        }

        return "align-items-center";
    }, [centered, vertical]);

    return <nav
        className={`nav ${className} ${classList(vertical, 'vertical')}`}
        {...navProps}>

        {children.map((navItemProps, key) => <NavItem
            {...navItemProps}
            key={key}
            style={{ height }}
            className={`${center} ${navItemProps.className || ''}`}
        />)}

        {active >= 0 &&
            <motion.div
                className="nav-cursor"
                onAnimationComplete={() => previousIndex = active}
                variants={variants}
                initial="initial"
                animate="animate"
                style={style}
            />}
    </nav>
}); 