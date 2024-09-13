import React from "react";
import useSearch from "../../core/hooks/useSearch";
import Notification from "../Notification/Notification";
import SearchInput from "../SearchInput/SearchInput";
import UserDropdown from "../UserDropdown/UserDropdown";

export default function () {
    const { setSearch, search } = useSearch();

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        const { value } = e.target;
        setSearch(value);
    }, [setSearch]);

    return <nav className="navbar gap-3">
        <SearchInput onChange={handleSearch} value={search}/>
        <Notification />
        <UserDropdown />
    </nav>
}