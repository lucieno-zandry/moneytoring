import React from "react";
import ModalContainer from "../Modal/Modal";
import { ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { ModalContainerProps } from "../Modal/Container/Container";

type DeleteDialogueProps = {
    body: React.JSX.Element,
} & ModalContainerProps<'form'>

export default React.memo((props: DeleteDialogueProps) => {
    const { body, ...modalContainerProps } = props;

    return <ModalContainer {...modalContainerProps} as="form">
        <ModalHeader className="d-block">
            <ModalTitle>
                Are you sure?
            </ModalTitle>
            <small className="text-muted">
                There is no way of restoring a deleted item.
            </small>
        </ModalHeader>
        <ModalBody>
            {body}
        </ModalBody>
        <ModalFooter>
            <Button variant="secondary" size="sm" onClick={props.onClose}>
                Cancel
            </Button>
            <Button variant="danger" size="sm" type="submit">
                <Icon variant="trash" /> Delete
            </Button>
        </ModalFooter>
    </ModalContainer>
})