import React from "react";
import { JsObject } from "../../../core/config/types/variables";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import CodeInput from "../../../partials/CodeInput/CodeInput";
import useAuth from "../../../core/hooks/useAuth";
import { User } from "../../../core/config/types/models";
import ResendEmailCountdown from "../../../partials/ResendEmailCountdown/ResendEmailCountdown";

const Confirmation = React.memo(() => {
    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
    });

    const user = useAuth(state => state.user) as User;

    const handleOnComplete = React.useCallback(() => {

    }, []);

    return <AuthForm
        className="confirmation-page text-align-center">
        <label htmlFor="code-input-0">
            <h3 className="display-6 mb-1">Please, confirm your email!</h3>
            <small className="text-muted">
                A confirmation code has been sent to <strong className="user-email">{user.email}</strong>,
                We invite you to check your inbox.
            </small>
        </label>

        <CodeInput onComplete={handleOnComplete} error={state.validationMessages?.code}/>

        <ResendEmailCountdown initConfirmation={() => {}}/>
        
    </AuthForm>
});

export default Confirmation;