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
import useNumberFormat from "../../core/hooks/useNumberFormat";
import useSetting from "../../core/hooks/useSetting";

interface AccountModalProps extends Omit<ModalContainerProps<'form'>, 'onSubmit'> {
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

    const { toString, toNumber } = useNumberFormat();
    const { setting } = useSetting();

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
                balance: toNumber(formData.balance),
                icon: state.form.icon,
            }

            onSubmit(newAccount);
            props.onClose && props.onClose();
        }

        setState(s => ({ ...s, validationMessages }));
    }, [onSubmit, props.onClose, state.form.icon, account, toNumber]);

    const handleIconSubmit = React.useCallback((selected: string = '') => {
        setState(s => ({ ...s, form: { ...s.form, icon: selected }, showIconDrawer: false, paused: false }));
    }, [props.onClose]);

    const toggleIconsDrawer = React.useCallback(() => {
        setState(s => ({ ...s, showIconDrawer: !s.showIconDrawer, paused: !s.paused }));
    }, []);

    React.useEffect(() => {
        if (!account.id) return;
        setState(s => ({ ...s, form: { ...s.form, icon: account.icon } }));
    }, [account]);

    const isVisible = React.useMemo(() => {
        if (state.paused) return false;
        return show;
    }, [state.paused, show]);

    return <>
        <ModalContainer
            as="form"
            onSubmit={handleSubmit}
            show={isVisible}
            {...modalProps}>

            <ModalHeader withCloseButton>
                <ModalTitle>{editMode ? 'Edit' : 'Create'} account</ModalTitle>
            </ModalHeader>

            <ModalBody className="d-flex gap-3 justify-content-center flex-wrap align-items-start">
                <ButtonGroup className="col-12 col-sm-9 col-md-3">
                    <IconButton
                        iconProps={{ variant: state.form.icon || icons[0] }}
                    />
                    <Button onClick={toggleIconsDrawer} variant={state.form.icon ? "primary" : "secondary"}>{state.form.icon || 'Choose Icon'}</Button>
                </ButtonGroup>

                <FloatingForm.Input
                    id="account.name"
                    labelProps={{ label: <><Icon variant="input-text" /> Name</>, className: "col-12 col-sm-9 col-md-3" }}
                    placeholder="Eg: Bank Account"
                    error={state.validationMessages?.name}
                    defaultValue={account.name}
                />

                <FloatingForm.Input
                    id="account.balance"
                    type="number"
                    labelProps={{ label: <><Icon variant="money-bill-simple" /> Budget ({setting.currency})</>, className: "col-12 col-sm-9 col-md-3" }}
                    placeholder="Account balance"
                    error={state.validationMessages?.balance}
                    defaultValue={toString(account.balance)}
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
                    type="submit"
                    size="sm">
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