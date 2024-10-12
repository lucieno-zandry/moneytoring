import React from "react";
import useAuth from "../../core/hooks/useAuth";
import Button from "../Button/Button";
import useLogout from "../../core/hooks/useLogout";
import ModalContainer, { ModalFooter } from "../Modal/Modal";
import { ModalHeader, ModalTitle } from "react-bootstrap";
import { logout } from "../../core/api/actions";
import storageTokenActions from "../../core/helpers/storageTokenActions";

const LogoutDialog = React.memo(() => {
    const { isLoggingOut, toggleLoggingOut } = useLogout();
    const { setAuth } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogout = React.useCallback(() => {
        setIsLoading(true);
        logout()
            .finally(() => {
                setAuth(false);
                storageTokenActions.remove();
                toggleLoggingOut();
                setIsLoading(false);
            })
    }, [toggleLoggingOut]);

    return <ModalContainer
        show={isLoggingOut}
        onClose={toggleLoggingOut}
        className="logout-dialog-container">
        <ModalHeader>
            <ModalTitle>
                <h5 className="logout-dialog-title">
                    Sign out
                </h5>
                <p className="text-muted m-0">You will need to log in again on this device.</p>
            </ModalTitle>
        </ModalHeader>
        <ModalFooter>
            <Button
                type="button"
                size="sm"
                onClick={toggleLoggingOut}>cancel</Button>
            <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleLogout}
                isLoading={isLoading}>
                <i className="fa fa-power-off"></i> Log out
            </Button>
        </ModalFooter>
    </ModalContainer>
})

export default LogoutDialog;