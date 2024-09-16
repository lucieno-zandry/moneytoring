import React from "react";
import EmailForm from "../../../partials/EmailForm/EmailForm";
import NamesForm from "../../../partials/NamesForm/NamesForm";
import { Link } from "react-router-dom";
import { loginPage } from "../../../core/config/links/pages";
import PasswordCreationForm from "../../../partials/PasswordCreationForm/PasswordCreationForm";
import Icon from "../../../partials/Icon/Icon";
import { Button } from "../../../partials/Button/Button";
import formObservations from "../../../core/helpers/formObservations";
import { JsObject } from "../../../core/config/types/variables";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import useSteps from "../../../core/hooks/useSteps";

export type StepProps = {
    errors: JsObject | null,
    defaultValue: JsObject,
}

const Steps = [
    {
        component: EmailForm,
        form: {
            email: '',
        }
    },
    {
        component: NamesForm,
        form: {
            name: '',
            firstname: '',
        }
    },
    {
        component: PasswordCreationForm,
        form: {
            password: '',
            password_confirmation: ''
        }
    }
];

const getInitialForm = () => {
    let form: JsObject = {};

    Steps.forEach(Step => {
        form = { ...form, ...Step.form }
    })

    return form;
}

const initialForm = getInitialForm();

const Signup = React.memo(() => {
    const [state, setState] = React.useState({
        form: initialForm,
        validationMessages: null as JsObject | null,
        isLoading: false,
    });

    const { active, next, prev, Container } = useSteps(Steps);

    const isFirstStep = React.useMemo(() => active === 0, [active]);
    const isLastStep = React.useMemo(() => active === (Steps.length - 1), [active]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        e.preventDefault();
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {
            if (isLastStep) {

            } else {
                setTimeout(() => {
                    next();
                    setState(s => ({ ...s, isLoading: false }));
                });
            }
        }

        setState(s => ({ ...s, form: { ...s.form, ...formData }, validationMessages, isLoading: !validationMessages }))
    }, [active, isLastStep]);

    return <AuthForm className="signup-page" onSubmit={handleSubmit}>
        <Container
            predicate={((step) => <step.component defaultValue={state.form} errors={state.validationMessages} />)} className="d-flex align-items-center gap-3 col-12 flex-column" />

        <div className="d-flex justify-content-center gap-3 flex-wrap">
            {!isFirstStep &&
                <Button.Static variant="outline-secondary" onClick={prev}>
                    <Icon variant="arrow-left" /> Previous
                </Button.Static>}

            {!isLastStep &&
                <Button.Static
                    variant="primary"
                    type="submit"
                    isLoading={state.isLoading}>
                    Next <Icon variant="arrow-right" />
                </Button.Static>}

            {isLastStep &&
                <Button.Static type="submit">
                    Done <Icon variant="check" />
                </Button.Static>}

            <small className="col-12 text-align-center">Already have an acount? Try to <Link to={loginPage}>log in.</Link></small>
        </div>
    </AuthForm>
});

export default Signup;