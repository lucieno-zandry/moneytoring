import React from "react";
import FloatingForm from "../FormFloating/FormFloating";
import Icon from "../Icon/Icon";
import { JsObject } from "../../core/config/types/variables";

type Props = {
    errors: JsObject | null,
    defaultValue?: JsObject,
}

const EmailForm = React.memo((props: Props) => {
    return <>
        <FloatingForm.Input
            id="user.email"
            name="email"
            autoComplete="email"
            labelProps={{ label: <><Icon variant="envelope" /> Email</>, className: "col-10 col-sm-8" }}
            type="email"
            placeholder="username@example.com"
            error={props.errors?.email}
            defaultValue={props.defaultValue?.email}
        />
    </>
});

export default EmailForm;