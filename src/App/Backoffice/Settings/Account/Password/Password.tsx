import React from "react";
import Button from "../../../../../partials/Button/Button";
import Icon from "../../../../../partials/Icon/Icon";
import { ModalBody, ModalFooter, ModalHeader, useModal } from "../../../../../partials/Modal/Modal";
import FormFloating from "../../../../../partials/FormFloating/FormFloating";
import formObservations from "../../../../../core/helpers/formObservations";
import { JsObject } from "../../../../../core/config/types/variables";
import { ModalTitle } from "react-bootstrap";

const defaultState = {
    editing: false,
    validationMessages: null as JsObject | null,
}

export default React.memo(() => {
    const [state, setState] = React.useState(defaultState);

    const { editing, validationMessages } = state;

    const setEditing = React.useCallback((editing: boolean) => {
        setState(s => ({ ...s, editing }))
    }, []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations(e);
        console.log(formData, validationMessages);
        if (!validationMessages) {

        }
        setState(s => ({ ...s, validationMessages }))
    }, []);

    const Modal = useModal();

    return <>
        <div className="d-flex justify-content-between align-items-center mt-3">
            <p>Password</p>
            <Modal.Toggle
                onClick={() => setEditing(true)}
                className="btn"
                show={editing}>
                <Icon variant="chevron-right" />
            </Modal.Toggle>
        </div>

        <Modal.Container
            show={editing}
            as="form"
            onSubmit={handleSubmit}
            align="center"
            onClose={() => setState(defaultState)}
            size="sm">
            <ModalHeader>
                <ModalTitle>Password Changing</ModalTitle>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3 align-items-center">
                <FormFloating.Input
                    id="user.password"
                    name="password"
                    labelProps={{ label: <><Icon variant="lock" /> Current password</>, className: "col-10 col-sm-6" }}
                    error={validationMessages?.password}
                    autoComplete="password"
                    type="password" />

                <FormFloating.Input
                    id="user.new_password"
                    name="password"
                    type="password"
                    labelProps={{ label: <><Icon variant="user-lock" /> New password</>, className: "col-10 col-sm-6" }}
                    error={validationMessages?.new_password}
                    autoComplete="new_password"
                />

                <FormFloating.Input
                    id="user.password_confirm"
                    name="password"
                    type="password"
                    labelProps={{ label: <><Icon variant="user-lock" /> Confirm your password</>, className: "col-10 col-sm-6" }}
                    error={validationMessages?.password_confirm}
                />

            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={() => setState(defaultState)}>cancel</Button>
                <Button variant="primary" size="sm" type="submit">save <Icon variant="check-circle" /></Button>
            </ModalFooter>
        </Modal.Container>
    </>
});