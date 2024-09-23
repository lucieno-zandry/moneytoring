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
            <p>Firstname</p>
            <div className="text-muted d-flex align-items-center gap-2">
                {user.firstname} <Modal.Toggle
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
            <ModalHeader>
                <ModalTitle>Change your firstname</ModalTitle>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3 align-items-center">
                <FormFloating.Input
                    id="user.firstname"
                    name="firstname"
                    labelProps={{ label: <><Icon variant="enveloppe" /> Firstname</>, className: "col-10 col-sm-6" }}
                    error={validationMessages?.firstname}
                    defaultValue={user.firstname} />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={() => setState(defaultState)}>cancel</Button>
                <Button variant="primary" size="sm" type="submit">save <Icon variant="check-circle" /></Button>
            </ModalFooter>
        </Modal.Container>
    </>
});