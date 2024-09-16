import React from "react";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import { Transaction } from "../../../core/config/types/models";
import randomNumber from "../../../core/helpers/randomNumber";
import Table from "../../../partials/Table/Table";
import arrayUpdate from "../../../core/helpers/arrayUpdate";
import TransactionRow from "../../../partials/TransactionRow/TransactionRow";
import TransactionModal from "../../../partials/TransactionModal/TransactionModal";
import { StepProps } from "../Setup";
import { defaultTransactions } from "../../../core/hooks/useTransactions";


const TransactionCreation = React.memo((props: StepProps) => {
    const { onDone } = props;

    const balance = React.useMemo(() => randomNumber(6), []);

    const [state, setState] = React.useState({
        creationMode: false,
        transactions: defaultTransactions(balance) as Transaction[],
        editingTransaction: undefined as Transaction | undefined,
    });

    const { transactions, creationMode, editingTransaction } = state;

    const toggleCreationMode = React.useCallback(() => {
        setState(s => ({ ...s, creationMode: !s.creationMode }));
    }, []);

    const addTransaction = React.useCallback((transaction: Transaction) => {
        const newTransactions = transactions ? [...transactions, transaction] : [transaction];
        setState(s => ({ ...s, transactions: newTransactions }));
    }, [transactions]);

    const handleDelete = React.useCallback((transactions: Transaction[]) => {
        if (!state.transactions.length || !transactions.length) return;

        let newTransactions = [...state.transactions];

        transactions.forEach(transaction => {
            newTransactions = newTransactions.filter(c => c.id !== transaction.id);
        });

        setState(s => ({ ...s, transactions: newTransactions }));
    }, [state.transactions]);

    const setEditingTransaction = React.useCallback((transaction: Transaction) => {
        setState(s => ({ ...s, editingTransaction: transaction, creationMode: false }));
    }, []);

    const disableEditMode = React.useCallback(() => {
        setState(s => ({ ...s, editingTransaction: undefined, creationMode: false }));
    }, [])

    const handleEditSubmit = React.useCallback((transaction: Transaction) => {
        if (!editingTransaction) return;
        const newTransactions = arrayUpdate(transactions, transaction, (transaction) => transaction.id === editingTransaction?.id);
        setState(s => ({ ...s, transactions: newTransactions, editingTransaction: undefined }));
    }, [editingTransaction]);

    const editMode = React.useMemo(() => Boolean(editingTransaction), [editingTransaction]);

    return <>
        <div className="transaction-creation col-12">
            <h3 className="display-6">Recurring Transactions</h3>
            <p className="text-muted">
                Optionally, you can configure recurring transactions to automate events like incomes or expenses. <br />
                Setting up your transactions saves you from manually registering transactions that happen more than once.</p>
            {transactions && transactions.length > 0 &&
                <Table
                    headers={['', 'amount', 'description', 'next occurence', 'recurrence', 'type']}
                    items={transactions}
                    TDs={TransactionRow}
                    onDelete={handleDelete}
                    onEdit={setEditingTransaction} />}
        </div>

        <CornerButtons position="start" className="container">
            <Button variant="outline-secondary" size="sm">
                Skip <Icon variant="chevron-right" />
            </Button>
        </CornerButtons>

        <CornerButtons className="container">
            <Button
                variant="secondary"
                onClick={toggleCreationMode}
                size="sm"><Icon variant="plus" /> Transaction</Button>

            <Button
                variant="primary"
                disabled={transactions.length < 1}
                onClick={onDone}
                size="sm">
                Done <Icon variant="check-circle" />
            </Button>
        </CornerButtons>
        
        <TransactionModal
            onSubmit={editMode ? handleEditSubmit : addTransaction}
            transaction={editingTransaction}
            show={editMode || creationMode}
            onClose={editMode ? disableEditMode : toggleCreationMode}
            editMode={editMode} />
    </>
});

export default TransactionCreation;