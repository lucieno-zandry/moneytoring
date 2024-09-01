import { ModalTitle } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { ModalBody, ModalBundle, ModalFooter, ModalHeader } from "../Modal/Modal"
import FloatingForm from "../FloatingForm/FloatingForm";
import React from "react";
import formObservations from "../../core/helpers/formObservations";
import { Account } from "../../core/config/types/models";
import { fakeAccount } from "../../core/config/constants/fakes";
import { JsObject } from "../../core/config/types/variables";
import { ModalContainerProps } from "../Modal/Container/Container";

interface AccountCreationModalProps extends Omit<ModalContainerProps, 'onSubmit'> {
    onSubmit: (account: Account) => void,
    Modal: ModalBundle,
}

const AccountCreationModal = (props: AccountCreationModalProps) => {
    const { Modal, onSubmit, ...modalProps } = props;

    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations(e);
        if (!validationMessages) {
            const account: Account = {
                ...fakeAccount,
                ...formData
            }

            onSubmit(account);
            props.onClose && props.onClose();
        }

        setState(s => ({ ...s, validationMessages }));
    }, [onSubmit, props.onClose]);

    return <Modal.Container
        as="form"
        onSubmit={handleSubmit}
        align="end"
        {...modalProps}>

        <ModalHeader withCloseButton>
            <ModalTitle>Create budget account</ModalTitle>
        </ModalHeader>

        <ModalBody className="d-flex gap-3 justify-content-center">
            <FloatingForm
                id="account.name"
                label={<><Icon variant="input-text" /> Account name</>}
                placeholder="Eg: Bank Account"
                error={state.validationMessages?.name}
            />

            <FloatingForm
                id="account.balance"
                label={<><Icon variant="dollar-sign" /> Account balance</>}
                placeholder="Account balance"
                error={state.validationMessages?.balance}
            />
        </ModalBody>

        <ModalFooter>
            <Button
                variant="secondary"
                size="sm"
                onClick={props.onClose as React.MouseEventHandler<HTMLButtonElement>}>
                Cancel
            </Button>
            <Button
                variant="primary"
                type="submit">
                <Icon variant="check-circle" /> Save
            </Button>
        </ModalFooter>
    </Modal.Container>
}

export default AccountCreationModal;