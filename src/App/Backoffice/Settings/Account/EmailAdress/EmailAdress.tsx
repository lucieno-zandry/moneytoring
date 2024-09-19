import React from "react";
import Button from "../../../../../partials/Button/Button";
import Icon from "../../../../../partials/Icon/Icon";
import { User } from "../../../../../core/config/types/models";
import useAuth from "../../../../../core/hooks/useAuth";
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
    const user = useAuth().user as User;
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
            <p>Email adress</p>
            <div className="text-muted d-flex align-items-center gap-2">
                {user.email} <Modal.Toggle
                    onClick={() => setEditing(true)}
                    className="btn">
                    <Icon variant="chevron-right" />
                </Modal.Toggle>
            </div>
        </div>

        <Modal.Container
            show={editing}
            as="form"
            onSubmit={handleSubmit}
            align="center"
            onClose={() => setState(defaultState)}
            size="sm">
            <ModalHeader className="d-block">
                <ModalTitle>Email changing</ModalTitle>
                <small className="text-muted">You will have to verify your email again after you change it.</small>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3 align-items-center">
                <FormFloating.Input
                    id="user.email"
                    name="email"
                    labelProps={{ label: <><Icon variant="enveloppe" /> Email adress</>, className: "col-10 col-sm-6" }}
                    error={validationMessages?.email}
                    defaultValue={user.email} />

                <FormFloating.Input
                    id="user.password"
                    name="password"
                    type="password"
                    labelProps={{ label: <><Icon variant="lock" /> Confirm your password</>, className: "col-10 col-sm-6" }}
                    error={validationMessages?.password}
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={() => setState(defaultState)}>cancel</Button>
                <Button variant="primary" size="sm" type="submit">save <Icon variant="check-circle" /></Button>
            </ModalFooter>
        </Modal.Container>
    </>
});