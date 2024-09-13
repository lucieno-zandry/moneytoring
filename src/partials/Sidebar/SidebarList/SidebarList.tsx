import React from "react";
import SidebarItem, { SidebarItemProps } from "../SidebarItem/SidebarItem";
import { motion } from "framer-motion";
import useSidebar from "../../../core/hooks/useSidebar";

type SidebarListProps = {
    children: SidebarItemProps[],
}

let previousIndex = 0;

const getVariants = (active: number) => {
    const variant = {
        initial: {
            top: `${previousIndex * 3}rem`,
        },
        animate: {
            top: `${active * 3}rem`,
        }
    }
    return variant;
}

const SidebarList = React.memo((props: SidebarListProps) => {
    const { children } = props;
    const { active } = useSidebar();

    return <ul className="sidebar-list">
        {children.map((sidebarItemProps, key) =>
            <SidebarItem
                {...sidebarItemProps}
                key={key}
                index={key} />)}

        <motion.li
            className="sidebar-cursor"
            variants={getVariants(active.index)}
            initial="initial"
            animate="animate"
            onAnimationComplete={() => { previousIndex = active.index}}/>
    </ul>
});

export default SidebarList;