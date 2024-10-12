import React from "react";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import CodeInput from "../../../partials/CodeInput/CodeInput";
import useAuth from "../../../core/hooks/useAuth";
import ResendEmailCountdown from "../../../partials/ResendEmailCountdown/ResendEmailCountdown";
import { Translate } from "react-i18nify";
import useScreenLoader from "../../../partials/ScreenLoader/hooks/useScreenLoader";
import { confirm, requestConfirmation } from "../../../core/api/actions";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type ValidationMessages = {
    code: string,
}

const Confirmation = React.memo(() => {
    const [state, setState] = React.useState({
        validationMessages: null as ValidationMessages | null,
    });

    const { user, setAuth } = useAuth();
    const { toggle } = useScreenLoader();

    const sendConfirmationCode = React.useCallback(() => {
        requestConfirmation()
            .then(() => {
                toast.success("Confirmation Code sent!");
            })
            .catch((error: AxiosError) => {
                toast.error(error.message);
            })
    }, [])

    React.useEffect(sendConfirmationCode, []);

    const handleOnComplete = React.useCallback((code: string) => {
        if (!user) return;
        toggle();
        const newState = { ...state };
        confirm(parseInt(code))
            .then((response) => {
                const user = response.data.user;
                setAuth(user);
            })
            .catch((error: AxiosError<{ errors: ValidationMessages }>) => {
                switch (error.response?.status) {
                    case 422:
                        newState.validationMessages = error.response.data.errors;
                        break;

                    default:
                        toast.error(error.message);
                        break;
                }
            })
            .finally(() => {
                toggle();
                setState(newState);
            });
    }, [user, state]);

    if (!user) return;

    return <AuthForm
        className="confirmation-page text-align-center">
        <label htmlFor="code-input-0">
            <h3 className="display-6 mb-1"><Translate value="application.confirm_your_email" /></h3>
            <small className="text-muted">
                <Translate value="application.confirmation_code_sent" /> <strong className="user-email">{user.email}</strong>,
                <Translate value="application.check_inbox" />
            </small>
        </label>

        <CodeInput onComplete={handleOnComplete} error={state.validationMessages?.code} />

        <ResendEmailCountdown resendEmail={sendConfirmationCode} />
    </AuthForm>
});

export default Confirmation;