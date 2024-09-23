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
            <p>Name</p>
            <div className="text-muted d-flex align-items-center gap-2">
                {user.name} <Modal.Toggle
                    onClick={() => setEditing(true)}
                    className="btn"
                    show={editing}>
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
                <ModalTitle>Name changing</ModalTitle>
                <small className="text-muted">You won't use this to log in, this is only visible by you.</small>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3 align-items-center">
                <FormFloating.Input
                    id="user.name"
                    name="name"
                    labelProps={{ label: <><Icon variant="user" /> Name</>, className: "col-10 col-sm-6" }}
                    error={validationMessages?.name}
                    defaultValue={user.name} />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={() => setState(defaultState)}>cancel</Button>
                <Button variant="primary" size="sm" type="submit">save <Icon variant="check-circle" /></Button>
            </ModalFooter>
        </Modal.Container>
    </>
});