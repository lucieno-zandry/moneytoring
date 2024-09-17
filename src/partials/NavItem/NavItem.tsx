import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classList from "../../core/helpers/classList";
import Icon from "../Icon/Icon";
import { HTMLMotionProps, motion, Variants } from "framer-motion";

export type NavItemProps = {
    children: React.ReactNode,
    icon: string,
} & Omit<HTMLMotionProps<"a">, 'ref'>

const color = 'var(--light)';
const colorActive = 'rgba(255, 255, 255, .5)';

export const NavItem = React.memo((props: NavItemProps) => {
    const { className = '', children, icon, href = '', ...linkProps } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = React.useCallback((e) => {
        e.preventDefault();

        if (location.pathname !== href) {
            navigate(href);
        }
    }, [location.pathname, href, navigate]);

    const isActive = React.useMemo(() => location.pathname === href, [location.pathname, href]);
    const elementClassName = React.useMemo(() => `nav-item ${className} ${classList(isActive, 'active')}`, [className, isActive]);

    const variants: Variants = React.useMemo(() => ({
        initial: {
            color: colorActive,
        },
        animate: {
            color: isActive ? color : colorActive,
        }
    }), [color, isActive]);

    return <motion.a
        className={elementClassName}
        onClick={handleClick}
        href={href}
        {...linkProps}
        variants={variants}
        initial="initial"
        animate="animate">
        <Icon variant={icon} type={isActive ? "solid" : "thin"} /> {children}
    </motion.a>
});