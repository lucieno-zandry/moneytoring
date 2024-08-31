import React from "react";
import FloatingForm from "../FloatingForm/FloatingForm";
import Icon from "../Icon/Icon";
import { JsObject } from "../../core/config/types/variables";

type Props = {
    errors: JsObject | null,
    defaultValue: JsObject,
}

const EmailForm = React.memo((props: Props) => {
    return <>
        <FloatingForm
            id="user.email"
            name="email"
            autoComplete="email"
            label={<><Icon variant="envelope" /> Email</>}
            labelClassName="col-10 col-sm-8"
            type="email"
            placeholder="username@example.com"
            error={props.errors?.email}
            defaultValue={props.defaultValue.email}
        />
    </>
});

export default EmailForm;