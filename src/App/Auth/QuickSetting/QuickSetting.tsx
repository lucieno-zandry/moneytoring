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
import { Translate } from "react-i18nify";

const languages = Object.keys(LANGUAGES);
const currencies = Object.keys(CURRENCIES);

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

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(e => {
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {
            const newSetting = { ...setting, language: formData.language as Setting['language'], currency: formData.currency as Setting['currency'] }
            setSetting(newSetting);
        }

        setState(s => ({ ...s, validationMessages, show: Boolean(validationMessages) }))
    }, [setting]);

    return <>
        <CornerButtons top>
            <Toggle className="btn btn-outline-secondary btn-sm" onClick={() => setShow(true)} show={show}>
                {LANGUAGES[setting.language]} - {setting.currency} <Icon variant="chevron-down" />
            </Toggle>
        </CornerButtons>

        <Container show={show} size="sm" onClose={() => setShow(false)} as="form" onSubmit={handleSubmit}>
            <ModalHeader className="d-block">
                <ModalTitle><Translate value="application.set_up_preference" /></ModalTitle>
                <small className="text-muted"><Translate value="application.set_up_preference_description" /></small>
            </ModalHeader>
            <ModalBody className="d-flex gap-3 justify-content-center flex-wrap">
                <FormFloating.Select
                    id="setting.language"
                    options={languages}
                    predicate={(language: keyof typeof LANGUAGES) => ({ title: LANGUAGES[language], value: language })}
                    labelProps={{ label: <><Icon variant="language" /> <Translate value="application.Language" /></>, className: "col-12 col-sm-4" }}
                    defaultValue={setting.language}
                />

                <FormFloating.Select
                    id="setting.currency"
                    options={currencies}
                    predicate={(currency: keyof typeof CURRENCIES) => ({ title: CURRENCIES[currency], value: currency })}
                    labelProps={{ label: <><Icon variant="dollar-sign" /> <Icon variant="language" /> <Translate value="application.currency" /></>, className: "col-12 col-sm-4" }}
                    defaultValue={setting.currency}
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="outline-secondary" size="sm" onClick={() => setShow(false)}><Translate value="application.cancel" /></Button>
                <Button variant="primary" size="sm" type="submit"><Translate value="application.save" /> <Icon variant="check-circle" /></Button>
            </ModalFooter>
        </Container>
    </>
})