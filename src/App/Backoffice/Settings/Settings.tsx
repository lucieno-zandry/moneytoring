import React from "react"
import Nav from "../../../partials/Nav/Nav"
import { NavItemProps } from "../../../partials/NavItem/NavItem"
import { accountSettings, preferencesSettings, profileSettings } from "../../../core/config/links/pages"
import { Outlet } from "react-router-dom"

const navItems: NavItemProps[] = [
    {
        href: accountSettings,
        children: "Account",
        icon: "lock",
        className: 'col'
    },
    {
        href: profileSettings,
        children: "Profile",
        icon: "user",
        className: 'col'
    },
    {
        href: preferencesSettings,
        children: "Preferences",
        icon: "globe",
        className: 'col'
    }
]

export default React.memo(() => {

    return <main className="settings">
        <h2 className="display-4">Settings</h2>
        <Nav centered>
            {navItems}
        </Nav>
        <Outlet />
    </main>
})