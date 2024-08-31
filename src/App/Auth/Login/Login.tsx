import React from "react";
import Icon from "../../../partials/Icon/Icon";
import { Link } from "react-router-dom";
import { signupPage } from "../../../core/config/links/pages";
import FloatingForm from "../../../partials/FloatingForm/FloatingForm";
import { JsObject } from "../../../core/config/types/variables";
import formObservations from "../../../core/helpers/formObservations";
import Button from "../../../partials/Button/Button";
import AuthForm from "../../../partials/AuthForm/AuthForm";

const Login = React.memo(() => {
    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
        isLoading: false,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {

        }

        setState(s => ({ ...s, validationMessages, isLoading: !validationMessages }))
    }, []);

    return <AuthForm
            className="login-page"
            onSubmit={handleSubmit}>

            <FloatingForm
                id="user.email"
                name="email"
                label={<><Icon variant="envelope" /> Email</>}
                labelClassName="col-10 col-sm-8"
                type="email"
                placeholder="username@example.com"
                autoComplete="email"
                error={state.validationMessages?.email}
                required
            />

            <FloatingForm
                id="user.password"
                name="password"
                label={<><Icon variant="lock" /> Password</>}
                labelClassName="col-10 col-sm-8"
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