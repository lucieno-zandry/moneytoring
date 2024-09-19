import React from "react";
import Icon from "../../../partials/Icon/Icon";
import { Link } from "react-router-dom";
import { signupPage } from "../../../core/config/links/pages";
import FloatingForm from "../../../partials/FormFloating/FormFloating";
import { JsObject } from "../../../core/config/types/variables";
import formObservations from "../../../core/helpers/formObservations";
import Button from "../../../partials/Button/Button";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import useAuth from "../../../core/hooks/useAuth";
import { fakeUser } from "../../../core/config/constants/fakes";

const Login = React.memo(() => {
    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
        isLoading: false,
    });

    const { setAuth } = useAuth();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {
            setAuth({ ...fakeUser, ...formData })
        }

        setState(s => ({ ...s, validationMessages, isLoading: !validationMessages }))
    }, []);

    return <AuthForm
        className="login-page"
        onSubmit={handleSubmit}>
        <FloatingForm.Input
            id="user.email"
            name="email"
            labelProps={{ className: "col-10 col-sm-8", label: <><Icon variant="envelope" /> Email</> }}
            type="email"
            placeholder="username@example.com"
            autoComplete="email"
            error={state.validationMessages?.email}
            required
        />

        <FloatingForm.Input
            id="user.password"
            name="password"
            labelProps={{ className: "col-10 col-sm-8", label: <><Icon variant="lock" /> Password</> }}
            type="password"
            placeholder="your password"
            autoComplete="current_password"
            error={state.validationMessages?.password}
            required
        />

        <Button
            variant="primary"
            className="col-6"
            type="submit"
            isLoading={state.isLoading}>
            Log in
        </Button>

        <small>Don't have an acount? Try to <Link to={signupPage}>register.</Link></small>
    </AuthForm>
});

export default Login;