import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import { ModalBody, ModalFooter, ModalHeader, useModal } from "../../../partials/Modal/Modal";
import useSetting from "../../../core/hooks/useSetting";
import { CURRENCIES, LANGUAGES } from "../../../core/config/constants/constants";
import React from "react";
import Icon from "../../../partials/Icon/Icon";
import FormFloating from "../../../partials/FormFloating/FormFloating";
import { ModalTitle } from "react-bootstrap";
import Button from "../../../partials/Button/Button";
import formObservations from "../../../core/helpers/formObservations";
import { JsObject } from "../../../core/config/types/variables";
import { Setting } from "../../../core/config/types/models";
import sessionSettingActions from "../../../core/helpers/sessionSettingActions";

export default React.memo(() => {
    const { Container, Toggle } = useModal();
    const { setting, setSetting } = useSetting();

    const [state, setState] = React.useState({
        show: false,
        validationMessages: null as JsObject | null,
    });

    const { show } = state;

    const setShow = React.useCallback((show: boolean) => {
        setState(s => ({ ...s, show }))
    }, []);

    const languages = React.useMemo(() => Object.keys(LANGUAGES), []);
    const currencies = React.useMemo(() => Object.keys(CURRENCIES), []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(e => {
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {
            const newSetting = { ...setting, language: formData.language as Setting['language'], currency: formData.currency as Setting['currency'] }
            sessionSettingActions.set(newSetting);
            setSetting(newSetting);
        }

        setState(s => ({ ...s, validationMessages, show: Boolean(validationMessages) }))
    }, [setting]);


    return <>
        <CornerButtons top>
            <Toggle className="btn btn-outline-secondary btn-sm" onClick={() => setShow(true)}>
                {LANGUAGES[setting.language]} - {setting.currency} <Icon variant="chevron-down" />
            </Toggle>
        </CornerButtons>

        <Container show={show} size="sm" onClose={() => setShow(false)} as="form" onSubmit={handleSubmit}>
            <ModalHeader className="d-block">
                <ModalTitle>Set up your preferences</ModalTitle>
                <small className="text-muted">You can choose to display the application in your language, the currency you specify will be used by the app. </small>
            </ModalHeader>
            <ModalBody className="d-flex gap-3 justify-content-center flex-wrap">
                <FormFloating.Select
                    id="setting.language"
                    options={languages}
                    predicate={(language: keyof typeof LANGUAGES) => ({ title: LANGUAGES[language], value: language })}
                    labelProps={{ label: <><Icon variant="language" /> Language</>, className: "col-12 col-sm-4" }}
                    defaultValue={setting.language}
                />

                <FormFloating.Select
                    id="setting.currency"
                    options={currencies}
                    predicate={(currency: keyof typeof CURRENCIES) => ({ title: CURRENCIES[currency], value: currency })}
                    labelProps={{ label: <><Icon variant="dollar-sign" /> Currency</>, className: "col-12 col-sm-4" }}
                    defaultValue={setting.currency}
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="outline-secondary" size="sm" onClick={() => setShow(false)}>cancel</Button>
                <Button variant="primary" size="sm" type="submit">save <Icon variant="check-circle" /></Button>
            </ModalFooter>
        </Container>
    </>
})