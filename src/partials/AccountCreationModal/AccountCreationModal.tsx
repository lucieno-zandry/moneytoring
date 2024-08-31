import { ModalTitle } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { ModalBundle, ModalContainerProps } from "../Modal/Modal"

export default function (props: ModalContainerProps & { Modal: ModalBundle }) {
    const { Modal, ...modalProps } = props;

    return <Modal.Container {...modalProps}>
        <Modal.Header>
            <ModalTitle>Create budget account</ModalTitle>
        </Modal.Header>
        <Modal.Body className="d-flex">

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={props.onClose as React.MouseEventHandler<HTMLButtonElement>}> Cancel</Button>
            <Button variant="primary"><Icon variant="check-circle" /> Save</Button>
        </Modal.Footer>
    </Modal.Container>
}