import { ButtonGroup, ModalTitle } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { ModalBody, ModalFooter, ModalHeader } from "../Modal/Modal"
import FloatingForm from "../FormFloating/FormFloating";
import React from "react";
import formObservations from "../../core/helpers/formObservations";
import { Account } from "../../core/config/types/models";
import { fakeAccount } from "../../core/config/constants/fakes";
import { JsObject } from "../../core/config/types/variables";
import ModalContainer, { ModalContainerProps } from "../Modal/Container/Container";
import IconsDrawer, { icons } from "../IconsDrawer/IconsDrawer";
import IconButton from "../IconInput/IconInput";

interface AccountModalProps extends Omit<ModalContainerProps, 'onSubmit'> {
    onSubmit: (account: Account) => void,
    account?: Account,
    editMode?: boolean,
}

const defaultAccount: Account = {
    ...fakeAccount,
    icon: '',
    name: '',
    balance: 0,
}

const AccountModal = (props: AccountModalProps) => {
    const {
        onSubmit,
        account = defaultAccount,
        editMode = false,
        show = false,
        ...modalProps
    } = props;

    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
        showIconDrawer: false,
        paused: false,
        form: {
            icon: account.icon,
        }
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {
            const newAccount: Account = {
                ...account,
                name: formData.name,
                balance: parseInt(formData.balance),
                icon: state.form.icon,
            }

            onSubmit(newAccount);
            props.onClose && props.onClose();
        }

        setState(s => ({ ...s, validationMessages }));
    }, [onSubmit, props.onClose, state.form.icon, account]);

    const handleIconSubmit = React.useCallback((selected: string = '') => {
        setState(s => ({ ...s, form: { icon: selected }, showIconDrawer: false, paused: false }));
    }, [props.onClose]);

    const toggleIconsDrawer = React.useCallback(() => {
        setState(s => ({ ...s, showIconDrawer: !s.showIconDrawer, paused: !s.paused }));
    }, []);

    React.useEffect(() => {
        if (!account.name) return;
        setState(s => ({ ...s, form: { icon: account.icon } }));
    }, [account]);

    const isVisible = React.useMemo(() => {
        if (state.paused) return false;
        return show;
    }, [state.paused, show]);

    return <>
        <ModalContainer
            as="form"
            onSubmit={handleSubmit}
            align="end"
            show={isVisible}
            {...modalProps}>

            <ModalHeader withCloseButton>
                <ModalTitle>{editMode ? 'Edit' : 'Create'} account</ModalTitle>
            </ModalHeader>

            <ModalBody className="d-flex gap-3 justify-content-center">
                <ButtonGroup className="align-self-center">
                    <IconButton
                        iconProps={{ variant: state.form.icon || icons[0] }}
                    />
                    <Button onClick={toggleIconsDrawer}>{state.form.icon || 'Choose Icon'}</Button>
                </ButtonGroup>

                <FloatingForm.Input
                    id="account.name"
                    labelProps={{label: <><Icon variant="input-text" /> Name</>}}
                    placeholder="Eg: Bank Account"
                    error={state.validationMessages?.name}
                    defaultValue={account.name}
                />

                <FloatingForm.Input
                    id="account.balance"
                    type="number"
                    labelProps={{label: <><Icon variant="money-bill-simple" /> Budget</>}}
                    placeholder="Account balance"
                    error={state.validationMessages?.balance}
                    defaultValue={account.balance}
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
                    <Icon variant="check-circle" /> Done
                </Button>
            </ModalFooter>
        </ModalContainer>
        <IconsDrawer
            show={state.showIconDrawer}
            onSubmit={handleIconSubmit}
            onClose={toggleIconsDrawer}
            defaultSelected={state.form.icon}
        />
    </>
}

export default AccountModal;