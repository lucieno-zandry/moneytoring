import React from "react";
import Button from "../Button/Button";
import MotionFade from "../MotionFade/MotionFade";
import { Translate } from "react-i18nify";

type Props = {
    resendEmail: Function
};

let interval: null | number;
const DEFAULTCOUNTDOWN = 60;

const ResendEmailCountdown = React.memo((props: Props) => {
    const { resendEmail } = props;

    const [countdown, setCountdown] = React.useState(DEFAULTCOUNTDOWN);

    React.useEffect(() => {
        if (countdown > 0) {
            if (!interval) {
                interval = setInterval(() => {
                    setCountdown(c => --c);
                }, 1000);
            }
        } else {
            interval && clearInterval(interval);
            interval = null;
        }

        return () => {
            interval && clearInterval(interval);
            interval = null;
        }
    }, [countdown]);

    const handleResendCode = React.useCallback(() => {
        resendEmail();
        setCountdown(DEFAULTCOUNTDOWN);
    }, [resendEmail]);

    return <div>
        Didn't receive any email? <br />
        <MotionFade
            hidden={countdown < 1}
            className="text-dark text-muted">
            <Translate value="application.can_send_new_code"/> <span>{countdown}</span>
        </MotionFade>
        <MotionFade
            hidden={countdown > 0}>
            <Button
                type="button"
                className="btn-primary mt-2"
                onClick={handleResendCode}><Translate value="application.resend_code"/></Button>
        </MotionFade>
    </div>
});

export default ResendEmailCountdown;