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
import useAuth from "../../../core/hooks/useAuth";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { emailCheck, signup } from "../../../core/api/actions";
import storageTokenActions from "../../../core/helpers/storageTokenActions";
import { Translate } from "react-i18nify";
import { toggleFirstTime } from "../../../core/helpers/firstTimeActions";

export type SignupData = {
    email: string,
    name: string,
    firstname: string,
    password: string,
    password_confirmation: string,
}

export type StepProps = {
    errors: JsObject | null,
    defaultValue: JsObject,
}

const Steps = [EmailForm, NamesForm, PasswordCreationForm];

const initialForm: SignupData = {
    email: '',
    name: '',
    firstname: '',
    password: '',
    password_confirmation: ''
}

const Signup = React.memo(() => {
    const [state, setState] = React.useState({
        form: initialForm,
        validationMessages: null as SignupData | null,
        isLoading: false,
    });

    const { active, next, prev, Container } = useSteps(Steps);
    const { setAuth } = useAuth();

    const isFirstStep = React.useMemo(() => active === 0, [active]);
    const isLastStep = React.useMemo(() => active === (Steps.length - 1), [active]);

    const initSignup = React.useCallback((formData: SignupData) => {
        const newState = { ...state };
        signup(formData)
            .then(response => {
                const { token, user } = response.data;
                storageTokenActions.set(token);
                newState.form = initialForm;
                toast.success('Register success');
                toggleFirstTime();
                setAuth(user);
            })
            .catch((error: AxiosError) => {
                if (error.status === 422) {
                    const { errors } = error.response?.data as { errors: SignupData };
                    newState.validationMessages = errors;
                } else {
                    toast.error(error.message);
                }
            })
            .finally(() => {
                newState.isLoading = false;
                setState(newState);
            });
    }, [state]);

    const initEmailCheck = React.useCallback((email: string) => {
        const newState = { ...state };
        emailCheck(email)
            .then(() => {
                newState.form.email = email;
                next();
            })
            .catch((error: AxiosError<{ errors: SignupData }>) => {
                if (error.status === 422) {
                    const errors = error.response?.data.errors || null
                    newState.validationMessages = errors;
                } else {
                    newState.validationMessages = null;
                    toast.error(error.message);
                }
            })
            .finally(() => {
                newState.isLoading = false;
                setState(newState);
            })
    }, [state]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        e.preventDefault();
        const { formData, validationMessages } = formObservations<SignupData>(e);
        const newStateForm = { ...state.form };

        if (!validationMessages) {
            switch (active) {
                case 0:
                    initEmailCheck(formData.email);
                    break;

                case Steps.length - 1:
                    newStateForm.password = formData.password;
                    newStateForm.password_confirmation = formData.password_confirmation;
                    initSignup(newStateForm);
                    break;

                default:
                    newStateForm.name = formData.name;
                    newStateForm.firstname = formData.firstname;

                    setTimeout(() => {
                        setState(s => ({ ...s, isLoading: false }));
                        next();
                    }, 250);
                    break;
            }
        }

        setState(s => ({ ...s, form: newStateForm, validationMessages, isLoading: !validationMessages }))
    }, [active, initSignup, initEmailCheck, state.form]);

    return <AuthForm className="signup-page" onSubmit={handleSubmit}>
        <Container
            predicate={((Step) => <Step defaultValue={state.form} errors={state.validationMessages} />)} className="d-flex align-items-center gap-3 col-12 flex-column" />

        <div className="d-flex justify-content-center gap-3 flex-wrap-reverse">
            {!isFirstStep &&
                <Button.Static variant="outline-secondary" onClick={prev}>
                    <Icon variant="arrow-left" /> <Translate value="application.previous" />
                </Button.Static>}

            {!isLastStep &&
                <Button.Static
                    variant="primary"
                    type="submit"
                    isLoading={state.isLoading}
                    className="col-6 col-sm-4">
                    Next <Icon variant="arrow-right" />
                </Button.Static>}

            {isLastStep &&
                <Button.Static type="submit" variant="primary" isLoading={state.isLoading}>
                    <Translate value="application.done" /> <Icon variant="check" />
                </Button.Static>}

            <small className="col-12 text-align-center">
                <Translate value="application.already_have_account" /> <Link to={loginPage}><Translate value="application.log_in" />.</Link></small>
        </div>
    </AuthForm>
});

export default Signup;