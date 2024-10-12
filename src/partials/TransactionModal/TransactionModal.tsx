import { ButtonGroup, ModalTitle } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { ModalBody, ModalFooter, ModalHeader } from "../Modal/Modal"
import FloatingForm from "../FormFloating/FormFloating";
import React from "react";
import formObservations from "../../core/helpers/formObservations";
import { Account, Category, Transaction, TransactionRecurrence } from "../../core/config/types/models";
import { fakeAccount, fakeTransaction, fakeTransactionRecurrence } from "../../core/config/constants/fakes";
import { JsObject } from "../../core/config/types/variables";
import ModalContainer, { ModalContainerProps } from "../Modal/Container/Container";
import IconsDrawer, { icons } from "../IconsDrawer/IconsDrawer";
import IconButton from "../IconInput/IconInput";
import getValidationMessage from "../../core/helpers/getValidationMessage";
import getName from "../../core/helpers/unPrefix";
import Datum from "../../core/helpers/Datum";
import { HTMLTag } from "../HTMLElement/HTMLElement";
import useNumberFormat from "../../core/hooks/useNumberFormat";
import useSetting from "../../core/hooks/useSetting";
import useAccounts from "../../core/hooks/useAccounts";
import useCategories from "../../core/hooks/useCategories";

interface TransactionModalProps extends Omit<ModalContainerProps<HTMLTag>, 'onSubmit'> {
    onSubmit: (transaction: Transaction) => void,
    transaction?: Transaction,
    editMode?: boolean,
}

const getDefaultTransaction = (account: Account | null): Transaction => ({
    ...fakeTransaction,
    id: 0,
    icon: '',
    description: '',
    account: account || fakeAccount,
})

const recurrencePatterns: TransactionRecurrence['pattern'][] = ['YEARLY', 'MONTHLY', 'WEEKLY', 'ONCE'];
const transactionTypes: Transaction['type'][] = ['INCOME', 'EXPENSE'];

const tomorrow = new Datum().addDays(1);
const tomorrowIso = tomorrow.toISOString();

const TransactionModal = React.memo((props: TransactionModalProps) => {
    const { accounts } = useAccounts();
    const { categories } = useCategories();

    const {
        onSubmit,
        transaction = getDefaultTransaction(accounts && accounts[0]),
        editMode = false,
        show = false,
        ...modalProps
    } = props;

    const { toNumber, toString } = useNumberFormat();
    const { setting } = useSetting();

    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
        showIconDrawer: false,
        paused: false,
        form: {
            icon: transaction.icon,
            type: 'EXPENSE' as Transaction['type'],
            amount: 0,
            description: '',
            pattern: recurrencePatterns[0],
            next_occurence: tomorrowIso,
        }
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        let { formData, validationMessages } = formObservations(e);

        const account_id = parseInt(formData.account_id);
        const account = accounts!.find(account => account.id === account_id);

        const category_id = parseInt(formData.category_id);
        const category = categories!.find(category => category.id === category_id);

        if (!account) {
            const accountMessage = { account_id: "this account does not exist" }
            validationMessages = validationMessages ? { ...validationMessages, ...accountMessage } : accountMessage;
        }

        if (!category) {
            const categoryMessage = { category_id: "this category does not exit" };
            validationMessages = validationMessages ? { ...validationMessages, ...categoryMessage } : categoryMessage;
        }

        if (!validationMessages) {
            const newTransaction: Transaction = {
                ...transaction,
                description: formData.description,
                amount: toNumber(formData.amount),
                account_id: account!.id,
                account: account!,
                category: category!,
                icon: state.form.icon,
                type: state.form.type,
                transaction_recurrence: {
                    ...fakeTransactionRecurrence,
                    next_occurence: state.form.next_occurence,
                    pattern: state.form.pattern,
                },
            }

            onSubmit(newTransaction);
            props.onClose && props.onClose();
        }

        setState(s => ({ ...s, validationMessages }));
    }, [onSubmit, props.onClose, state.form, transaction, toNumber, accounts]);

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

    const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = React.useCallback(e => {
        const { id, value } = e.target;
        const name = getName(id);
        const validationMessage = getValidationMessage(id, value)
        const validationObject = { [name]: validationMessage };

        const validationMessages = validationMessage ? { ...state.validationMessages, ...validationObject } : state.validationMessages
        setState(s => ({ ...s, form: { ...s.form, [getName(id)]: value, validationMessages } }));
    }, [state.validationMessages]);

    return <>
        <ModalContainer
            as="form"
            onSubmit={handleSubmit}
            show={isVisible}
            size="md"
            className="transaction-modal"
            {...modalProps}>

            <ModalHeader withCloseButton>
                <ModalTitle>{editMode ? 'Edit' : 'Create'} transaction</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <div className="d-flex gap-3 align-items-center justify-content-between flex-wrap">
                    <ButtonGroup
                        className="col-12 col-sm-4">
                        <IconButton
                            iconProps={{ variant: state.form.icon || icons[0] }}
                            labelProps={{ className: 'choose-icon-label' }}
                        />
                        <Button onClick={toggleIconsDrawer} variant={state.form.icon ? "primary" : "secondary"}>{state.form.icon || 'Choose Icon'}</Button>
                    </ButtonGroup>

                    <FloatingForm.Input
                        id="transaction.amount"
                        type="number"
                        labelProps={{ label: <><Icon variant="money-bill-simple" /> Amount ({setting.currency})</>, className: "col" }}
                        placeholder="Transaction amount"
                        error={state.validationMessages?.amount}
                        defaultValue={toString(transaction.amount)}
                        onBlur={handleBlur}

                    />
                </div>

                <div className="d-flex my-3 gap-3 flex-wrap">
                    <FloatingForm.TextArea
                        id="transaction.description"
                        labelProps={{ label: <><Icon variant="input-text" /> Description</>, className: "col-12 col-sm-8" }}
                        placeholder="Eg: Bank Transaction"
                        error={state.validationMessages?.description}
                        defaultValue={transaction.description}
                        onBlur={handleBlur}
                    />

                    <FloatingForm.Select
                        id="transaction.type"
                        labelProps={{ label: <><Icon variant="categories" /> Type</>, className: 'col' }}
                        options={transactionTypes}
                        predicate={(option: Transaction['type']) => option}
                        onBlur={handleBlur}
                        defaultValue={transaction.type} />
                </div>

                <div className="d-flex gap-3 justify-content-between flex-wrap">
                    <FloatingForm.Select
                        id="transaction.account_id"
                        labelProps={{ label: <><Icon variant="book" /> Account</>, className: 'col-12 col-sm-6' }}
                        options={accounts!}
                        predicate={(account: Account) => ({ title: account.name, value: account.id })}
                        defaultValue={transaction.account?.id}
                        error={state.validationMessages?.account_id} />

                    <FloatingForm.Select
                        id="transaction.category_id"
                        labelProps={{ label: <><Icon variant="stream" /> Category</>, className: 'col' }}
                        options={categories!}
                        predicate={(category: Category) => ({ title: category.name, value: category.id })}
                        defaultValue={transaction.category_id}
                        error={state.validationMessages?.category_id} />
                </div>

                <div className="d-flex gap-3 justify-content-between flex-wrap mt-3">
                    <FloatingForm.Select
                        id="transaction_recurrence.pattern"
                        labelProps={{ label: <><Icon variant="clock" /> Recurrence</>, className: 'col-12 col-sm-6' }}
                        options={recurrencePatterns}
                        predicate={(option: TransactionRecurrence['pattern']) => option}
                        onBlur={handleBlur}
                        defaultValue={transaction.transaction_recurrence?.pattern || 'ONCE'} />

                    {state.form.pattern !== 'ONCE' &&
                        <FloatingForm.Input
                            type="date"
                            id="transaction_recurrence.next_occurence"
                            labelProps={{ label: <><Icon variant="calendar" /> Next Occurence</>, className: "col" }}
                            placeholder="Next Occurence"
                            error={state.validationMessages?.first_occurence}
                            onBlur={handleBlur}
                            min={tomorrowIso}
                            defaultValue={tomorrowIso} />}
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
})

export default TransactionModal;