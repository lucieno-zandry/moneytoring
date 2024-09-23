import React from "react";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import PasswordCreationForm from "../../../partials/PasswordCreationForm/PasswordCreationForm";
import { JsObject } from "../../../core/config/types/variables";
import Button from "../../../partials/Button/Button";
import formObservations from "../../../core/helpers/formObservations";
import { useParams } from "react-router-dom";

const PasswordReset = React.memo(() => {

    const { token } = useParams();

    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
        isLoading: false,
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {
            formData
        }

        setState(s => ({ ...s, validationMessages, isLoading: !validationMessages }));
    }, []);

    console.log(token);

    return <AuthForm className="password-reset" onSubmit={handleSubmit}>
        <h3>Reset your password</h3>
        <PasswordCreationForm errors={state.validationMessages} />
        <Button
            type="submit"
            variant="primary"
            isLoading={state.isLoading}>
            Reset Password
        </Button>
    </AuthForm>
})

export default PasswordReset;