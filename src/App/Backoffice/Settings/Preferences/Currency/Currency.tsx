import React from "react";
import Button from "../../../../../partials/Button/Button";
import Icon from "../../../../../partials/Icon/Icon";
import { ModalBody, ModalFooter, ModalHeader, useModal } from "../../../../../partials/Modal/Modal";
import FormFloating from "../../../../../partials/FormFloating/FormFloating";
import formObservations from "../../../../../core/helpers/formObservations";
import { ModalTitle } from "react-bootstrap";
import useSetting from "../../../../../core/hooks/useSetting";
import { CURRENCIES } from "../../../../../core/config/constants/constants";
import { updateSetting } from "../../../../../core/api/actions";
import { Setting } from "../../../../../core/config/types/models";
import toast from "react-hot-toast";

type CurrencyData = { currency: Setting['currency'] };

const defaultState = {
    editing: false,
    validationMessages: null as CurrencyData | null,
}

export default React.memo(() => {
    const [state, setState] = React.useState(defaultState);
    const { setting, setSetting } = useSetting();

    const { editing, validationMessages } = state;

    const setEditing = React.useCallback((editing: boolean) => {
        setState(s => ({ ...s, editing }))
    }, []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations<CurrencyData>(e);
        if (!validationMessages) {
            updateSetting({ language: setting.language, currency: formData.currency })
                .then((response) => {
                    toast.success('Settings saved!');
                    const newSetting = response.data.setting as Setting;
                    setSetting(newSetting);
                })
                .catch(() => {
                    toast.error('Failed to change settings');
                });
        }

        setState(s => ({ ...s, validationMessages, editing: !!validationMessages}))
    }, [setting]);

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
                <small className="text-muted">Choose the currency to be used by the application.</small>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3 align-items-center">
                <FormFloating.Select
                    id="setting.currency"
                    labelProps={{ label: <><Icon variant="money-bill" /> Currency</>, className: "col-10 col-sm-7" }}
                    options={Object.keys(CURRENCIES)}
                    predicate={(option: keyof typeof CURRENCIES) => ({ title: CURRENCIES[option], value: option })}
                    error={validationMessages?.currency}
                    defaultValue={setting.currency} />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={() => setState(defaultState)}>cancel</Button>
                <Button variant="primary" size="sm" type="submit">save <Icon variant="check-circle" /></Button>
            </ModalFooter>
        </Modal.Container>
    </>
});