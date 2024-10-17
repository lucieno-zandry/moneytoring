import React from "react";
import { Transaction } from "../../../core/config/types/models";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import useTransactions from "../../../core/hooks/useTransactions";
import TransactionModal from "../../../partials/TransactionModal/TransactionModal";
import Motion from "../../../partials/Motion/Motion";
import DeleteDialogue from "../../../partials/DeleteDialogue/DeleteDialogue";
import TransactionsTable from "../../../partials/TransactionTables/TransactionsTable";
import Filter, { FilterData } from "../../../partials/Filter/Filter";
import useCategories from "../../../core/hooks/useCategories";
import useAccounts from "../../../core/hooks/useAccounts";
import { createTransactions, getTransactions, updateTransaction } from "../../../core/api/actions";
import toast from "react-hot-toast";
import useScreenLoader from "../../../partials/ScreenLoader/hooks/useScreenLoader";
import arrayUpdate from "../../../core/helpers/arrayUpdate";

const defaultState = {
    editing: undefined as Transaction | undefined,
    creating: false,
    deleting: [] as Transaction[],
    filtering: false,
}

const Transactions = React.memo(() => {
    const { setTransactions, transactions } = useTransactions();
    const { categories } = useCategories();
    const { accounts } = useAccounts();
    const screenLoader = useScreenLoader();

    const [state, setState] = React.useState(defaultState);

    const handleEdit = React.useCallback((editing: Transaction) => {
        setState(s => ({ ...s, editing, creating: false }));
    }, []);

    const handleSubmit = React.useCallback((transaction: Transaction) => {
        if (!transactions) return;

        screenLoader.toggle();

        if (state.creating && !state.editing) {
            createTransactions([transaction])
                .then((response) => {
                    const createds: Transaction[] = response.data.transactions;
                    setTransactions([...transactions, ...createds]);
                    setState(defaultState);
                    toast.success('Transaction created!');
                })
                .catch(() => {
                    toast.error('An error occured when trying to create the transaction');
                })
                .finally(screenLoader.toggle)
        } else if (state.editing && !state.creating) {
            updateTransaction(state.editing)
                .then((response) => {
                    const updated: Transaction = response.data.transaction;
                    setState(defaultState);
                    toast.success('Transaction updated!');
                    setTransactions(arrayUpdate(transactions, updated, transaction => transaction.id === updated.id))
                })
                .catch(() => {
                    toast.error('Failed to update transaction.')
                })
                .finally(screenLoader.toggle)
        }
    }, [state.creating, state.editing]);

    const toggleFiltering = React.useCallback(() => {
        setState(s => ({ ...s, filtering: !s.filtering }));
    }, []);

    const toggleCreating = React.useCallback(() => {
        setState(s => ({ ...s, creating: !s.creating, editing: undefined }));
    }, []);

    const handleClose = React.useCallback(() => {
        setState(s => ({ ...s, creating: false, editing: undefined }));
    }, []);

    const setDeleting = React.useCallback((accounts: Transaction[]) => {
        setState(s => ({ ...s, deleting: accounts }));
    }, []);

    const handleDelete = React.useCallback(() => {
        if (state.deleting.length === 0) return;
    }, [state.deleting]);

    const handleFilter = React.useCallback((filter: FilterData) => {
        getTransactions(filter)
            .then(response => {
                setTransactions(response.data.transactions);
                toast.success('Filter applied');
                setState(defaultState);
            })
            .catch(() => {
                toast.error('Failed to apply filter');
            });
    }, [])

    return <Motion.Main className="transactions">
        <div className="display-4 mb-3">Transactions</div>

        <Button className="mb-3" variant="outline-light" onClick={toggleFiltering}>
            <Icon variant="filter" /> Filter
        </Button>

        <TransactionsTable
            items={transactions}
            onDelete={setDeleting}
            onEdit={handleEdit} />

        <CornerButtons>
            <Button variant="primary" onClick={toggleCreating}><Icon variant="plus-circle" /> Transaction</Button>
        </CornerButtons>

        <TransactionModal
            show={Boolean(state.creating || state.editing)}
            onSubmit={handleSubmit}
            onClose={handleClose}
            transaction={state.editing} />

        <Filter
            data={{ accounts: accounts!, categories: categories! }}
            show={state.filtering}
            onClose={() => setState(s => ({ ...s, filtering: false }))}
            onSubmit={handleFilter} />

        <DeleteDialogue
            body={<TransactionsTable items={state.deleting} />}
            onSubmit={handleDelete}
            show={state.deleting.length > 0}
            onClose={() => setDeleting([])}
            size="lg" />
    </Motion.Main>
})

export default Transactions;