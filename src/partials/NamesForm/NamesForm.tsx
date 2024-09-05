import React from "react";
import FloatingForm from "../FormFloating/FormFloating";
import Icon from "../Icon/Icon";
import { JsObject } from "../../core/config/types/variables";

type Props = {
    errors: JsObject | null,
    defaultValue: JsObject,
}

const NamesForm = React.memo((props: Props) => {
    return <>
        <FloatingForm.Input
            id="user.name"
            name="name"
            autoComplete="name"
            labelProps={{ label: <><Icon variant="user" /> Name</>, className: "col-10 col-sm-8" }}
            type="text"
            placeholder="Your name"
            error={props.errors?.name}
            defaultValue={props.defaultValue.name}
        />

        <FloatingForm.Input
            id="user.firstname"
            name="firstname"
            autoComplete="firstname"
            labelProps={{ label: <><Icon variant="user-friends" /> Firstname</>, className: "col-10 col-sm-8" }}
            type="text"
            placeholder="username@example.com"
            error={props.errors?.firstname}
            defaultValue={props.defaultValue.firstname}
        />
    </>
});

export default NamesForm;