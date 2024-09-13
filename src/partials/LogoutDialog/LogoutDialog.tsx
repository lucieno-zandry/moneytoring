import React from "react";
import useAuth from "../../core/hooks/useAuth";
import Button from "../Button/Button";
import useLogout from "../../core/hooks/useLogout";
import ModalContainer, { ModalFooter } from "../Modal/Modal";
import { ModalHeader, ModalTitle } from "react-bootstrap";

const LogoutDialog = React.memo(() => {
    const { isLoggingOut, toggleLoggingOut } = useLogout();
    const { setAuth } = useAuth();

    const handleLogout = React.useCallback(() => {
        localStorage.removeItem("authToken");
        setAuth(false)
        toggleLoggingOut();
    }, [toggleLoggingOut]);

    return <ModalContainer
        show={isLoggingOut}
        onClose={toggleLoggingOut}
        className="logout-dialog-container">
        <ModalHeader>
            <ModalTitle>
                <h5 className="logout-dialog-title">
                    Déconnexion
                </h5>
                <p className="text-muted m-0">Vous aurez besoin de vous reconnecter sur cet appareil.</p>
            </ModalTitle>
        </ModalHeader>
        <ModalFooter>
            <Button
                type="button"
                size="sm"
                onClick={toggleLoggingOut}>annuler</Button>
            <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleLogout}>
                <i className="fa fa-power-off"></i> Se déconnecter
            </Button>
        </ModalFooter>
    </ModalContainer>
})

export default LogoutDialog;