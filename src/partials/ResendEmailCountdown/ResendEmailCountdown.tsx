import React from "react";
import Button from "../Button/Button";
import MotionFade from "../MotionFade/MotionFade";

type Props = {
    initConfirmation: Function
};

let interval: null | number;
const DEFAULTCOUNTDOWN = 60;

const ResendEmailCountdown = React.memo((props: Props) => {
    const { initConfirmation } = props;

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
        initConfirmation();
        setCountdown(DEFAULTCOUNTDOWN);
    }, [initConfirmation]);

    return <div>
        Didn't receive any email? <br />
        <MotionFade
            hidden={countdown < 1}
            className="text-dark text-muted">
            We can send another code in <span >{countdown}</span>
        </MotionFade>
        <MotionFade
            hidden={countdown > 0}>
            <Button
                type="button"
                className="btn-primary mt-2"
                onClick={handleResendCode}>Resend code</Button>
        </MotionFade>
    </div>
});

export default ResendEmailCountdown;