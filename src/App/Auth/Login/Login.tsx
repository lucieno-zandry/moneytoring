import React from "react";
import Icon from "../../../partials/Icon/Icon";
import { Link } from "react-router-dom";
import { passwordForgotten, signupPage } from "../../../core/config/links/pages";
import FloatingForm from "../../../partials/FormFloating/FormFloating";
import formObservations from "../../../core/helpers/formObservations";
import Button from "../../../partials/Button/Button";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import useAuth from "../../../core/hooks/useAuth";
import toast from "react-hot-toast";
import { login } from "../../../core/api/actions";
import { AxiosError } from "axios";
import storageTokenActions from "../../../core/helpers/storageTokenActions";
import { translate, Translate } from "react-i18nify";

export type LoginData = { email: string, password: string };

const Login = React.memo(() => {
    const [state, setState] = React.useState({
        validationMessages: null as LoginData | null,
        isLoading: false,
    });

    const { setAuth } = useAuth();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations<LoginData>(e);

        if (!validationMessages) {
            const newState = { ...state };
            login(formData)
                .then(response => {
                    const { token, user } = response.data;
                    storageTokenActions.set(token);
                    setAuth(user);
                    toast.success(translate('application.log_in_success'));
                })
                .catch((error: AxiosError) => {
                    if (error.status === 422) {
                        const { errors } = error.response?.data as { errors: LoginData };
                        newState.validationMessages = errors;
                    } else {
                        toast.error(error.message);
                    }
                })
                .finally(() => {
                    newState.isLoading = false;
                    setState(newState);
                });
        }

        setState(s => ({ ...s, validationMessages, isLoading: !validationMessages }))
    }, [state]);

    return <AuthForm
        className="login-page"
        onSubmit={handleSubmit}>
        <FloatingForm.Input
            id="user.email"
            name="email"
            labelProps={{ className: "col-10 col-sm-8", label: <><Icon variant="envelope" /> <Translate value="application.Email" /></> }}
            type="email"
            placeholder="username@example.com"
            autoComplete="email"
            error={state.validationMessages?.email}
            required
        />

        <FloatingForm.Input
            id="user.password"
            name="password"
            labelProps={{ className: "col-10 col-sm-8", label: <><Icon variant="lock" /> <Translate value="application.Password" /></> }}
            type="password"
            placeholder={translate('application.your_password')}
            autoComplete="current_password"
            error={state.validationMessages?.password}
            required
        />

        <Button
            variant="primary"
            className="col-6"
            type="submit"
            isLoading={state.isLoading}>
            <Translate value="application.log_in" />
        </Button>

        <small>
            <Link to={passwordForgotten}>Forgot your password?</Link>
        </small>

        <small>
            <Translate value="application.have_no_account" /> <Link to={signupPage}>
                <Translate value="application.register" />
            </Link>
        </small>
    </AuthForm>
});

export default Login;