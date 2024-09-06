import { ButtonGroup, ModalTitle } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { ModalBody, ModalFooter, ModalHeader } from "../Modal/Modal"
import FloatingForm from "../FormFloating/FormFloating";
import React from "react";
import formObservations from "../../core/helpers/formObservations";
import { Transaction } from "../../core/config/types/models";
import { fakeTransaction, fakeTransactionRecurrence } from "../../core/config/constants/fakes";
import { JsObject, RecurrencePattern } from "../../core/config/types/variables";
import ModalContainer, { ModalContainerProps } from "../Modal/Container/Container";
import IconsDrawer, { icons } from "../IconsDrawer/IconsDrawer";
import IconButton from "../IconInput/IconInput";
import getValidationMessage from "../../core/helpers/getValidationMessage";
import getName from "../../core/helpers/getName";
import Datum from "../../core/helpers/Datum";

interface TransactionModalProps extends Omit<ModalContainerProps, 'onSubmit'> {
    onSubmit: (transaction: Transaction) => void,
    transaction?: Transaction,
    editMode?: boolean,
}

const defaultTransaction: Transaction = {
    ...fakeTransaction,
    id: 0,
    icon: '',
    description: '',
}

const recurrencePatterns: RecurrencePattern[] = ['YEARLY', 'MONTHLY', 'WEEKLY'];

const tomorrow = new Datum().addDays(1);
const tomorrowIso = tomorrow.toISOString();

const TransactionModal = React.memo((props: TransactionModalProps) => {
    const {
        onSubmit,
        transaction = defaultTransaction,
        editMode = false,
        show = false,
        ...modalProps
    } = props;

    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
        showIconDrawer: false,
        paused: false,
        form: {
            icon: transaction.icon,
            amount: 0,
            description: '',
            pattern: recurrencePatterns[0],
            next_occurence: tomorrowIso
        }
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {
            const newTransaction: Transaction = {
                ...transaction,
                description: formData.description,
                amount: parseInt(formData.amount),
                icon: state.form.icon,
                transaction_recurrence: {
                    ...fakeTransactionRecurrence,
                    next_occurence: state.form.next_occurence,
                    pattern: state.form.pattern,
                }
            }

            onSubmit(newTransaction);
            props.onClose && props.onClose();
        }

        setState(s => ({ ...s, validationMessages }));
    }, [onSubmit, props.onClose, state.form, transaction]);

    const handleIconSubmit = React.useCallback((selected: string = '') => {
        setState(s => ({ ...s, form: { ...s.form, icon: selected }, showIconDrawer: false, paused: false }));
    }, [props.onClose]);

    const toggleIconsDrawer = React.useCallback(() => {
        setState(s => ({ ...s, showIconDrawer: !s.showIconDrawer, paused: !s.paused }));
    }, []);

    React.useEffect(() => {
        if (!transaction.id) return;
        const { transaction_recurrence } = transaction;
        setState(s => ({
            ...s,
            form: {
                ...s.form,
                icon: transaction.icon,
                amount: transaction.amount,
                description: transaction.description,
                pattern: transaction_recurrence?.pattern || recurrencePatterns[0],
                next_occurence: transaction_recurrence?.next_occurence || tomorrowIso
            }
        }));
    }, [transaction]);

    const isVisible = React.useMemo(() => {
        if (state.paused) return false;
        return show;
    }, [state.paused, show]);

    const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (e) => {
        const { id, value } = e.target;
        const name = getName(id);
        const validationMessage = getValidationMessage(id, value)
        const validationObject = { [name]: validationMessage };

        const validationMessages = validationMessage ? { ...state.validationMessages, ...validationObject } : state.validationMessages
        setState(s => ({ ...s, form: { ...s.form, [getName(id)]: value, validationMessages } }));
    }

    return <>
        <ModalContainer
            as="form"
            onSubmit={handleSubmit}
            align="center"
            show={isVisible}
            size="md"
            className="transaction-modal"
            {...modalProps}>

            <ModalHeader withCloseButton>
                <ModalTitle>{editMode ? 'Edit' : 'Create'} transaction</ModalTitle>
            </ModalHeader>

            <ModalBody className="px-5">
                <div className="d-flex gap-3 align-items-center justify-content-between">
                    <ButtonGroup
                        className="col-4">
                        <IconButton
                            iconProps={{ variant: state.form.icon || icons[0] }}
                            labelProps={{ className: 'choose-icon-label' }}
                        />
                        <Button onClick={toggleIconsDrawer} variant="primary">{state.form.icon || 'Choose Icon'}</Button>
                    </ButtonGroup>

                    <FloatingForm.Input
                        id="transactions.amount"
                        type="number"
                        labelProps={{ label: <><Icon variant="money-bill-simple" /> Amount</>, className: "col" }}
                        placeholder="Transaction amount"
                        error={state.validationMessages?.amount}
                        defaultValue={transaction.amount}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="d-flex my-3">
                    <FloatingForm.TextArea
                        id="transactions.description"
                        labelProps={{ label: <><Icon variant="input-text" /> Description</>, className: "col" }}
                        placeholder="Eg: Bank Transaction"
                        error={state.validationMessages?.description}
                        defaultValue={transaction.description}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="d-flex gap-3 justify-content-between">
                    <FloatingForm.Select
                        id="transactions_recurrences.pattern"
                        labelProps={{ label: <><Icon variant="clock" /> Recurrence</>, className: 'col-6' }}
                        options={recurrencePatterns}
                        predicate={(option: RecurrencePattern) => option}
                        onBlur={handleBlur} />

                    <FloatingForm.Input
                        type="date"
                        id="transactions_recurrences.next_occurence"
                        labelProps={{ label: <><Icon variant="calendar" /> Next Occurence</>, className: "col" }}
                        placeholder="Next Occurence"
                        error={state.validationMessages?.first_occurence}
                        onBlur={handleBlur}
                        min={tomorrowIso}
                        defaultValue={tomorrowIso} />
                </div>
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
})

export default TransactionModal;