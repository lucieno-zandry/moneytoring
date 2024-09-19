import React from "react";
import Modal from "../Modal/Modal";
import { ModalTitle } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { ModalContainerProps } from "../Modal/Container/Container";

type DeleteDialogueProps = {
    body: React.JSX.Element,
} & ModalContainerProps<'form'>

export default React.memo((props: DeleteDialogueProps) => {
    const { body, ...modalContainerProps } = props;

    return <Modal {...modalContainerProps} as="form">
        <Modal.Header className="d-block">
            <ModalTitle>
                Are you sure?
            </ModalTitle>
            <small className="text-muted">
                There is no way of restoring a deleted item.
            </small>
        </Modal.Header>
        <Modal.Body>
            {body}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={props.onClose}>
                Cancel
            </Button>
            <Button variant="danger" size="sm" type="submit">
                <Icon variant="trash" /> Delete
            </Button>
        </Modal.Footer>
    </Modal>
})