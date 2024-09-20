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
import Filter from "../../../partials/Filter/Filter";
import useCategories from "../../../core/hooks/useCategories";
import useAccounts from "../../../core/hooks/useAccounts";


const Transactions = React.memo(() => {
    const { setTransactions, transactions } = useTransactions();
    const { categories } = useCategories();
    const { accounts } = useAccounts();

    const [state, setState] = React.useState({
        editing: undefined as Transaction | undefined,
        creating: false,
        deleting: [] as Transaction[],
        filtering: false,
    });

    const handleEdit = React.useCallback((editing: Transaction) => {
        setState(s => ({ ...s, editing, creating: false }));
    }, []);

    const handleSubmit = React.useCallback((transaction: Transaction) => {
        if (state.creating) {

        } else {

        }
    }, [state.creating]);

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

    return <Motion.Main className="transactions">
        <div className="display-6 mb-3">Transactions</div>

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
            onClose={() => setState(s => ({ ...s, filtering: false }))} />

        <DeleteDialogue
            body={<TransactionsTable items={state.deleting} />}
            onSubmit={handleDelete}
            show={state.deleting.length > 0}
            onClose={() => setDeleting([])}
            size="lg" />
    </Motion.Main>
})

export default Transactions;