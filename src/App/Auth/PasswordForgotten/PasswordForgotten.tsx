import React from "react";
import AuthForm from "../../../partials/AuthForm/AuthForm";
import EmailForm from "../../../partials/EmailForm/EmailForm";
import Button from "../../../partials/Button/Button";
import useSteps from "../../../core/hooks/useSteps";
import ResendEmailCountdown from "../../../partials/ResendEmailCountdown/ResendEmailCountdown";

const PasswordForgotten = React.memo(() => {

    const Steps = React.useMemo(() => [
        <>
            <p>We will send a password reset link to your email adress.</p>
            <EmailForm defaultValue={{ email: '' }} errors={{ email: '' }} />
        </>,
        <>
            <h5 className="display-6">Password reset link sent!</h5>
            <p className="col-10  ">An email was sent to <strong></strong>, we invite you to verify your inbox.</p>
            <ResendEmailCountdown initConfirmation={() => { }} />
        </>
    ], []);

    const { active, Container, next } = useSteps(Steps);
    
    return <AuthForm className="password-forgotten">
        <Container predicate={(Step: React.JSX.Element) => Step} />
        {active === 0 &&
            <Button type="button" variant="primary" onClick={next}>Reset Password</Button>}
    </AuthForm>
});

export default PasswordForgotten;