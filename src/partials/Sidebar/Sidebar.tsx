import React from "react";
import Logo from "../Logo/Logo";
import SidebarList from "./SidebarList/SidebarList";
import useSidebar, { sidebarItems } from "../../core/hooks/useSidebar";
import classList from "../../core/helpers/classList";

const Sidebar = React.memo(() => {
    const { show } = useSidebar();

    // const [state, setState] = React.useState({
    //     show: show,
    //     closing: false,
    // });

    // React.useEffect(() => {
    //     if (show === state.show) return;

    //     if (show && !state.show) {
    //         setState(s => ({ ...s, show }));
    //     } else if (!show && state.show) {
    //         setState(s => ({ ...s, closing: true }))
    //         setTimeout(() => {
    //             setState(s => ({ ...s, show, closing: false }));
    //         }, 500);
    //     }
    // }, [show, state.show]);

    return <aside className={`sidebar d-sm-block col-2 col-md-3 col-lg-2 ${classList(!show, 'hidden')}`}>
        <Logo className="sidebar-logo" />
        <SidebarList>
            {sidebarItems}
        </SidebarList>
    </aside>
})

export default Sidebar;