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
import sessionAuthActions from "../../../core/helpers/sessionAuthActions";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { emailCheck, signup } from "../../../core/api/actions";

export type SignupData = {
    email: string,
    name: string,
    firstname: string,
    password: string,
    password_confirm: string,
}

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

    return form as SignupData;
}

const initialForm = getInitialForm();

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
                sessionAuthActions.store(user, token);
                setAuth(user);
                toast.success('Log in success');
            })
            .catch((error: AxiosError) => {
                if (error.status === 422) {
                    const { errors } = error.response?.data as { errors: SignupData };
                    newState.validationMessages = errors;
                }

                toast.error(error.message);
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
                next();
            })
            .catch((error: AxiosError) => {
                if (error.status === 422) {
                    const { errors } = error.response?.data as { errors: SignupData }
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
        if (!validationMessages) {
            if (isFirstStep) initEmailCheck(formData.email);
            if (isLastStep) initSignup(formData);
        }

        setState(s => ({ ...s, form: { ...s.form, ...formData }, validationMessages, isLoading: !validationMessages }))
    }, [active, isLastStep, initSignup, isFirstStep, initEmailCheck]);

    return <AuthForm className="signup-page" onSubmit={handleSubmit}>
        <Container
            predicate={((step) => <step.component defaultValue={state.form} errors={state.validationMessages} />)} className="d-flex align-items-center gap-3 col-12 flex-column" />

        <div className="d-flex justify-content-center gap-3 flex-wrap-reverse">
            {!isFirstStep &&
                <Button.Static variant="outline-secondary" onClick={prev}>
                    <Icon variant="arrow-left" /> Previous
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
                    Done <Icon variant="check" />
                </Button.Static>}

            <small className="col-12 text-align-center">Already have an acount? Try to <Link to={loginPage}>log in.</Link></small>
        </div>
    </AuthForm>
});

export default Signup;