import React from "react";
import FloatingForm from "../FloatingForm/FloatingForm";
import Icon from "../Icon/Icon";
import { JsObject } from "../../core/config/types/variables";

type Props = {
    errors: JsObject | null,
    defaultValue: JsObject,
}

const NamesForm = React.memo((props: Props) => {
    return <>
        <FloatingForm
            id="user.name"
            name="name"
            autoComplete="name"
            label={<><Icon variant="user" /> Name</>}
            labelClassName="col-10 col-sm-8"
            type="text"
            placeholder="Your name"
            error={props.errors?.name}
            defaultValue={props.defaultValue.name}
        />

        <FloatingForm
            id="user.firstname"
            name="firstname"
            autoComplete="firstname"
            label={<><Icon variant="user-friends" /> Firstname</>}
            labelClassName="col-10 col-sm-8"
            type="text"
            placeholder="username@example.com"
            error={props.errors?.firstname}
            defaultValue={props.defaultValue.firstname}
        />
    </>
});

export default NamesForm;