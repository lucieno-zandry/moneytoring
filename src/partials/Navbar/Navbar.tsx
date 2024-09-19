import React from "react";
import useSearch from "../../core/hooks/useSearch";
import Notification from "../Notification/Notification";
import SearchInput from "../SearchInput/SearchInput";
import UserDropdown from "../UserDropdown/UserDropdown";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import useSidebar from "../../core/hooks/useSidebar";

export default function () {
    const { setSearch, search } = useSearch();
    const { show, toggle } = useSidebar();

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        const { value } = e.target;
        setSearch(value);
    }, [setSearch]);

    return <nav className="navbar gap-3">
        {!show &&
            <Button
                className="sidebar-toggle d-block d-sm-none"
                onClick={toggle}>
                <Icon variant="arrow-right" />
            </Button>}
            
        <SearchInput
            onChange={handleSearch}
            value={search}
            containerProps={{ className: "col-4" }} />

        <Notification />
        <UserDropdown />
    </nav>
}