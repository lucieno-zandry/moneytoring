import React from "react";
import { Account } from "../../../core/config/types/models";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import AccountModal from "../../../partials/AccountModal/AccountModal";
import Motion from "../../../partials/Motion/Motion";
import useAccounts from "../../../core/hooks/useAccounts";
import DeleteDialogue from "../../../partials/DeleteDialogue/DeleteDialogue";
import AccountsTable from "../../../partials/AccountsTable/AccountsTable";

const Accounts = React.memo(() => {
    const { setAccounts, accounts } = useAccounts(state => state);

    const [state, setState] = React.useState({
        editing: undefined as Account | undefined,
        creating: false,
        deleting: [] as Account[],
    });

    const handleEdit = React.useCallback((editing: Account) => {
        setState(s => ({ ...s, editing, creating: false }));
    }, []);

    const setDeleting = React.useCallback((accounts: Account[]) => {
        setState(s => ({ ...s, deleting: accounts }));
    }, []);

    const handleSubmit = React.useCallback((account: Account) => {
        if (state.creating) {
            setAccounts;
            account;
        } else {

        }
    }, [state.creating]);

    const toggleCreating = React.useCallback(() => {
        setState(s => ({ ...s, creating: !s.creating, editing: undefined }));
    }, []);

    const handleClose = React.useCallback(() => {
        setState(s => ({ ...s, creating: false, editing: undefined }));
    }, []);

    const handleDelete = React.useCallback(() => {
        if (state.deleting.length === 0) return;

    }, [state.deleting]);

    return <Motion.Main className="accounts">
        <div className="display-4 mb-3">Accounts</div>

        <AccountsTable
            items={accounts}
            onDelete={setDeleting}
            onEdit={handleEdit} />

        <CornerButtons>
            <Button variant="primary" onClick={toggleCreating}><Icon variant="plus-circle" /> Account</Button>
        </CornerButtons>

        <AccountModal
            show={Boolean(state.creating || state.editing)}
            onSubmit={handleSubmit}
            onClose={handleClose}
            account={state.editing} />

        <DeleteDialogue
            show={state.deleting.length > 0}
            onSubmit={handleDelete}
            onClose={() => setDeleting([])}
            size="sm"
            body={<AccountsTable items={state.deleting} />}
        />
    </Motion.Main>
})

export default Accounts;