import React from "react";
import FloatingForm from "../FormFloating/FormFloating";
import Icon from "../Icon/Icon";
import { JsObject } from "../../core/config/types/variables";

type Props = {
    errors?: JsObject | null,
    defaultValue?: JsObject,
}

const PasswordCreationForm = React.memo((props: Props) => {
    return <>
        <FloatingForm.Input
            id="user.password"
            name="new_password"
            autoComplete="new_password"
            labelProps={{ label: <><Icon variant="user-lock" /> Create a password</>, className: "col-10 col-sm-8" }}
            type="password"
            placeholder="Your password"
            error={props.errors?.password}
            defaultValue={props.defaultValue?.password}
        />

        <FloatingForm.Input
            id="user.password_confirmation"
            labelProps={{ label: <><Icon variant="user-lock" type="solid" /> Confirm password</>, className: "col-10 col-sm-8" }}
            type="password"
            placeholder="confirm password"
            error={props.errors?.password_confirmation}
            defaultValue={props.defaultValue?.password_confirmation}
        />
    </>
});

export default PasswordCreationForm;