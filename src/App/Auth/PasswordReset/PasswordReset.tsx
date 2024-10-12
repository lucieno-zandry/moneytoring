import React from "react";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import PasswordCreationForm from "../../../partials/PasswordCreationForm/PasswordCreationForm";
import Button from "../../../partials/Button/Button";
import formObservations from "../../../core/helpers/formObservations";
import { useNavigate, useParams } from "react-router-dom";
import { Translate } from "react-i18nify";
import EmailForm from "../../../partials/EmailForm/EmailForm";
import { resetPassword } from "../../../core/api/actions";
import { User } from "../../../core/config/types/models";
import useAuth from "../../../core/hooks/useAuth";
import storageTokenActions from "../../../core/helpers/storageTokenActions";
import { AxiosError } from "axios";
import { loginPage } from "../../../core/config/links/pages";
import toast from "react-hot-toast";

export type PasswordResetData = {
    email: string,
    password: string,
    password_confirmation: string,
}

const PasswordReset = React.memo(() => {

    const { setAuth } = useAuth();
    const { token } = useParams();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        validationMessages: null as PasswordResetData | null,
        isLoading: false,
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        if (!token) return;
        const { formData, validationMessages } = formObservations<PasswordResetData>(e);

        if (!validationMessages) {
            const newState = { ...state };

            resetPassword({ ...formData, token })
                .then(response => {
                    const { user, token } = response.data as { user: User, token: string };
                    setAuth(user);
                    storageTokenActions.set(token);
                })
                .catch((error: AxiosError<{ errors: PasswordResetData }>) => {
                    switch (error.response?.status) {
                        case 422:
                            newState.validationMessages = error.response.data.errors;
                            break;

                        case 403:
                            navigate(loginPage);
                            toast.error("Action forbidden");
                            break;

                        default:
                            break;
                    }
                })
                .finally(() => {
                    newState.isLoading = false;
                    setState(newState);
                })
        }
        setState(s => ({ ...s, validationMessages, isLoading: !validationMessages }));
    }, [token, state]);

    return <AuthForm className="password-reset" onSubmit={handleSubmit}>
        <h3><Translate value="application.reset_password" /></h3>
        <EmailForm
            errors={state.validationMessages} />
        <PasswordCreationForm errors={state.validationMessages} />
        <Button
            type="submit"
            variant="primary"
            isLoading={state.isLoading}>
            <Translate value="application.reset_password" />
        </Button>
    </AuthForm>
});

export default PasswordReset;