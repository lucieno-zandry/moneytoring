import React from "react";
import FloatingForm from "../FloatingForm/FloatingForm";
import Icon from "../Icon/Icon";
import { JsObject } from "../../core/config/types/variables";

type Props = {
    errors?: JsObject | null,
    defaultValue?: JsObject,
}

const PasswordCreationForm = React.memo((props: Props) => {
    return <>
        <FloatingForm
            id="user.password"
            name="new_password"
            autoComplete="new_password"
            label={<><Icon variant="user-lock" /> Create a password</>}
            labelClassName="col-10 col-sm-8"
            type="password"
            placeholder="Your password"
            error={props.errors?.password}
            defaultValue={props.defaultValue?.password}
        />

        <FloatingForm
            id="password_confirmation"
            label={<><Icon variant="user-lock" type="solid" /> Confirm password</>}
            labelClassName="col-10 col-sm-8"
            type="password"
            placeholder="confirm password"
            error={props.errors?.password_confirmation}
            defaultValue={props.defaultValue?.password_confirmation}
        />
    </>
});

export default PasswordCreationForm;