import React from "react";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import { Transaction } from "../../../core/config/types/models";
import arrayUpdate from "../../../core/helpers/arrayUpdate";
import TransactionModal from "../../../partials/TransactionModal/TransactionModal";
import useTransactions from "../../../core/hooks/useTransactions";
import useAccounts from "../../../core/hooks/useAccounts";
import TransactionsTable from "../../../partials/TransactionTables/TransactionsTable";
import useCategories from "../../../core/hooks/useCategories";
import generateTransactions from "../../../core/helpers/generateTransactions";
import { createTransactions } from "../../../core/api/actions";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Motion from "../../../partials/Motion/Motion";
import { slideNext } from "../../../core/config/variants/variants";
import { isFirstTime, toggleFirstTime } from "../../../core/helpers/firstTimeActions";

const TransactionCreation = React.memo(() => {
    const { setTransactions } = useTransactions();

    const { accounts } = useAccounts();
    const { categories } = useCategories();

    const [state, setState] = React.useState({
        creationMode: false,
        transactions: generateTransactions(accounts, categories),
        editingTransaction: undefined as Transaction | undefined,
        isLoading: false,
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

    const handleSubmit = React.useCallback(() => {
        if (state.transactions.length === 0) return;
        setState(s => ({ ...s, isLoading: true }));
        createTransactions(state.transactions)
            .then(response => {
                const newTransactions = response.data.transactions as Transaction[];
                setTransactions(newTransactions);
            })
            .catch(error => {
                if (error instanceof AxiosError) {
                    toast.error('Failed to create transaction');
                }
            })
            .finally(() => setState(s => ({ ...s, isLoading: false })));
    }, [setTransactions, state.transactions]);

    React.useEffect(() => {
        if (!isFirstTime()) return;
        toggleFirstTime();
    }, []);

    return <>
        <Motion.Div className="container transaction-creation col-12" variants={slideNext}>
            <h3 className="display-6">Recurring Transactions</h3>
            <p className="text-muted">
                Optionally, you can configure recurring transactions to automate events like incomes or expenses. <br />
                Setting up your transactions saves you from manually registering transactions that happen more than once.</p>

            {transactions && transactions.length > 0 &&
                <TransactionsTable
                    onDelete={handleDelete}
                    onEdit={setEditingTransaction}
                    items={transactions} />}
        </Motion.Div>

        <CornerButtons position="start" className="container">
            <Button variant="outline-secondary" size="sm" onClick={() => setTransactions([])}>
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
                onClick={handleSubmit}
                size="sm"
                isLoading={state.isLoading}>
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