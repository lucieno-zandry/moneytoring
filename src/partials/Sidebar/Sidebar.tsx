import React from "react";
import Logo from "../Logo/Logo";
import SidebarList from "./SidebarList/SidebarList";
import { sidebarItems } from "../../core/hooks/useSidebar";


const Sidebar = React.memo(() => {
    return <aside className="sidebar d-none d-sm-block col-2 col-md-3 col-lg-2">
        <Logo className="sidebar-logo"/>
        <SidebarList>
            {sidebarItems}
        </SidebarList>
    </aside>
})

export default Sidebar;