import React from "react";
import Icon from "../../Icon/Icon";
import { useNavigate } from "react-router-dom";
import useSidebar from "../../../core/hooks/useSidebar";
import { motion } from "framer-motion";

export type SidebarItemProps = {
    icon: string,
    title: string,
    link: string,
}

type SidebarItemComponentProps = {
    index: number,
} & SidebarItemProps

const SidebarItem = React.memo((props: SidebarItemComponentProps) => {
    const { icon, title, link, index } = props;
    const navigate = useNavigate();
    const { active, setActive } = useSidebar();

    const isActive = React.useMemo(() => active.index === index, [active, index]);

    const handleClick = React.useCallback(() => {
        if (!isActive) {
            setActive({ index, link });
            navigate(link);
        }
    }, [isActive, link, index]);

    const animate = React.useMemo(() => ({
        color: isActive ? '#fff' : 'rgba(255, 255, 255, .6)',
    }), [isActive]);

    return <motion.li
        className="sidebar-item"
        onClick={handleClick}
        animate={animate}
        whileHover={{ scale: 1.1, transformOrigin: 0 }}>
        <Icon variant={icon} type={active ? "solid" : "thin"}/> <span className="d-none d-md-inline">{title}</span>
    </motion.li>
});

export default SidebarItem;