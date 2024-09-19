import React from "react";
import Logo from "../Logo/Logo";
import useSidebar from "../../core/hooks/useSidebar";
import classList from "../../core/helpers/classList";
import Nav from "../Nav/Nav";
import { NavItemProps } from "../NavItem/NavItem";
import { accounts, categories, dashboard, transactions } from "../../core/config/links/pages";

const sidebarItems: NavItemProps[] = [
    {
        icon: "home",
        children: <span className="d-none d-md-block">Dashboard</span>,
        href: dashboard,
    },
    {
        icon: "cash-register",
        children: <span className="d-none d-md-block">Transactions</span>,
        href: transactions,
    },
    {
        icon: "stream",
        children: <span className="d-none d-md-block">Categories</span>,
        href: categories,
    },
    {
        icon: "book",
        children: <span className="d-none d-md-block">Accounts</span>,
        href: accounts,
    },
];

const Sidebar = React.memo(() => {
    const { show } = useSidebar();

    return <aside className={`sidebar d-sm-block col-2 col-md-3 col-lg-2 ${classList(!show, 'hidden')}`}>
        <Logo className="sidebar-logo" />
        <Nav vertical>
            {sidebarItems}  
        </Nav>
    </aside>
})

export default Sidebar;