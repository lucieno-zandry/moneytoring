import React from "react";
import Button from "../../../../../partials/Button/Button";
import Icon from "../../../../../partials/Icon/Icon";
import { ModalBody, ModalFooter, ModalHeader, useModal } from "../../../../../partials/Modal/Modal";
import FormFloating from "../../../../../partials/FormFloating/FormFloating";
import formObservations from "../../../../../core/helpers/formObservations";
import { JsObject } from "../../../../../core/config/types/variables";
import { ModalTitle } from "react-bootstrap";
import useSetting from "../../../../../core/hooks/useSetting";
import { CURRENCIES } from "../../../../../core/config/constants/constants";

const defaultState = {
    editing: false,
    validationMessages: null as JsObject | null,
}

export default React.memo(() => {
    const [state, setState] = React.useState(defaultState);
    const { setting } = useSetting();

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
            <p>Currency</p>
            <div className="text-muted d-flex align-items-center gap-2">
                {CURRENCIES[setting.currency]} <Modal.Toggle
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
                <ModalTitle>Currency</ModalTitle>
                <small className="text-muted">Choose in which language the application should display.</small>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3 align-items-center">
                <FormFloating.Select
                    id="setting.language"
                    labelProps={{ label: <><Icon variant="language" /> Currency</>, className: "col-10 col-sm-7" }}
                    options={Object.keys(CURRENCIES)}
                    predicate={(option: keyof typeof CURRENCIES) => ({ title: CURRENCIES[option], value: option })}
                    error={validationMessages?.language}
                    defaultValue={setting.currency} />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={() => setState(defaultState)}>cancel</Button>
                <Button variant="primary" size="sm" type="submit">save <Icon variant="check-circle" /></Button>
            </ModalFooter>
        </Modal.Container>
    </>
});