import React from "react";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import EmailForm from "../../../partials/EmailForm/EmailForm";
import Button from "../../../partials/Button/Button";
import useSteps from "../../../core/hooks/useSteps";
import ResendEmailCountdown from "../../../partials/ResendEmailCountdown/ResendEmailCountdown";
import { Translate } from "react-i18nify";
import formObservations from "../../../core/helpers/formObservations";
import { requestResetPassword } from "../../../core/api/actions";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type PasswordForgottenData = {
    email: string,
}

const PasswordForgotten = () => {
    const { Container, next } = useSteps([0, 1]);

    const [state, setState] = React.useState({
        validationMessages: null as PasswordForgottenData | null,
        email: "",
    })

    const { email, validationMessages } = state;

    const sendPasswordResetEmail = React.useCallback((email: string) => {
        requestResetPassword(email)
            .then(() => {
                next();
            })
            .catch((error: AxiosError<{ errors: PasswordForgottenData }>) => {
                if (error.response?.status === 422) {
                    return setState(s => ({ ...s, validationMessages: error.response!.data.errors }));
                }

                toast.error("Failed to send email");
            })
    }, [next]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations<PasswordForgottenData>(e);
        if (!validationMessages) {
            sendPasswordResetEmail(formData.email);
        }
        setState(s => ({ ...s, validationMessages, email: formData.email }))
    }, [next, sendPasswordResetEmail]);

    const Form = <>
        <p>
            <Translate value="application.will_send_reset_link" />
        </p>
        <EmailForm errors={validationMessages} defaultValue={{ email }} />
        <Button type="submit" variant="primary" size="sm">
            <Translate value="application.reset_password" />
        </Button>
    </>

    const Message = <>
        <h5 className="display-6">Password reset link sent!</h5>
        <p className="col-10  ">
            <Translate value="application.email_sent_to" /> <strong>{email}</strong>, <Translate value="application.check_inbox" /></p>
        <ResendEmailCountdown resendEmail={sendPasswordResetEmail} />
    </>

    const Steps = [Form, Message];

    return <AuthForm className="password-forgotten" onSubmit={handleSubmit}>
        <Container predicate={(key) => Steps[key]} className="d-flex align-items-center gap-3 col-12 flex-column" />
    </AuthForm>
};

export default PasswordForgotten;