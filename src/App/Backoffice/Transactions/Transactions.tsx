import React from "react";
import Table from "../../../partials/Table/Table";
import TransactionRow from "../../../partials/TransactionRow/TransactionRow";
import { Transaction } from "../../../core/config/types/models";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import useTransactions from "../../../core/hooks/useTransactions";
import TransactionModal from "../../../partials/TransactionModal/TransactionModal";
import Motion from "../../../partials/Motion/Motion";

const Transactions = React.memo(() => {
    const { setTransactions, transactions } = useTransactions(state => state);

    const [state, setState] = React.useState({
        editing: undefined as Transaction | undefined,
        creating: false,
    });

    const handleEdit = React.useCallback((editing: Transaction) => {
        setState(s => ({ ...s, editing, creating: false }));
    }, []);

    const handleDelete = React.useCallback((transactions: Transaction[]) => {
        console.log(transactions);
    }, []);

    const handleSubmit = React.useCallback((transaction: Transaction) => {
        if (state.creating) {

        } else {

        }
    }, [state.creating]);

    const toggleCreating = React.useCallback(() => {
        setState(s => ({ ...s, creating: !s.creating, editing: undefined }));
    }, []);

    const handleClose = React.useCallback(() => {
        setState(s => ({ ...s, creating: false, editing: undefined }));
    }, []);

    return <Motion.Main className="transactions">
        <Table
            headers={['', 'amount', 'description', 'next_occurence', 'recurrence', 'type']}
            TDs={TransactionRow}
            items={transactions}
            onDelete={handleDelete}
            onEdit={handleEdit} />

        <CornerButtons>
            <Button variant="primary" onClick={toggleCreating}><Icon variant="plus-circle" /> Transaction</Button>
        </CornerButtons>

        <TransactionModal
            show={Boolean(state.creating || state.editing)}
            onSubmit={handleSubmit}
            onClose={handleClose}
            transaction={state.editing} />
    </Motion.Main>
})

export default Transactions;