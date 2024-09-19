import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../core/hooks/useAuth";
import useLogout from "../../core/hooks/useLogout";
import Button from "../Button/Button";
import { accountSettings } from "../../core/config/links/pages";
import SmallText from "../SmallText/SmallText";
import appImage from "../../core/helpers/appImage";
import Icon from "../Icon/Icon";

const Actions = React.memo(() => {
    const logout = useLogout();

    return <>
        <Dropdown.Item as={Link} to={accountSettings} className="btn"><Icon variant="cog" /> Settings</Dropdown.Item>
        <Dropdown.Item as={Button} onClick={logout.toggleLoggingOut}>
            <Icon variant="power-off" /> Log out
        </Dropdown.Item>
    </>
});

const UserDropdown = React.memo(() => {
    const { user } = useAuth();

    const userProfile = React.useMemo(() => {
        if (user) {
            return <>
                {user.image ?
                    <img className="user-profile-image" src={appImage(user.image)} /> :
                    <span className="user-profile">
                        {user.name.charAt(0)}
                    </span>} <span className="d-none d-sm-inline-block">
                    <SmallText maxLength={6} isExtendable={false}>
                        {user.name}
                    </SmallText>
                </span>
            </>
        }
    }, [user]);

    return <Dropdown className="user-dropdown nav-item">
        <Dropdown.Toggle variant="btn" className="btn-sm">
            {userProfile}
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-2" align='end'>
            <Actions />
        </Dropdown.Menu>
    </Dropdown>
})

export default UserDropdown;