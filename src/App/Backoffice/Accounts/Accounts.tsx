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
import { createAccounts, deleteAccounts, updateAccount } from "../../../core/api/actions";
import toast from "react-hot-toast";
import arrayUpdate from "../../../core/helpers/arrayUpdate";
import useRefreshAccounts from "../../../core/hooks/useRefreshAccounts";
import useScreenLoader from "../../../partials/ScreenLoader/hooks/useScreenLoader";

const defaultState = {
    editing: undefined as Account | undefined,
    creating: false,
    deleting: [] as Account[],
}

const Accounts = React.memo(() => {
    const { setAccounts, accounts } = useAccounts(state => state);
    const refreshAccounts = useRefreshAccounts();
    const screenLoader = useScreenLoader();

    const [state, setState] = React.useState(defaultState);

    const handleEdit = React.useCallback((editing: Account) => {
        setState(s => ({ ...s, editing, creating: false }));
    }, []);

    const setDeleting = React.useCallback((accounts: Account[]) => {
        setState(s => ({ ...s, deleting: accounts }));
    }, []);

    const handleSubmit = React.useCallback((account: Account) => {
        if (!accounts) return;

        screenLoader.toggle();

        if (state.creating) {
            createAccounts([account])
                .then((response) => {
                    setAccounts([...accounts, ...response.data.accounts]);
                    setState(defaultState)
                }).catch(() => {
                    toast.error("Failed to create account!")
                })
                .finally(screenLoader.toggle)
            account;
        } else {

            updateAccount(account)
                .then(response => {
                    const updated: Account = response.data.account;
                    setAccounts(arrayUpdate(accounts, updated, (item) => item.id === updated.id));
                    setState(defaultState)
                })
                .catch(() => {
                    toast.error("Failed to update account!");
                })
                .finally(screenLoader.toggle)
        }
    }, [state.creating, accounts]);

    const toggleCreating = React.useCallback(() => {
        setState(s => ({ ...s, creating: !s.creating, editing: undefined }));
    }, []);

    const handleClose = React.useCallback(() => {
        setState(s => ({ ...s, creating: false, editing: undefined }));
    }, []);

    const handleDelete: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        e.preventDefault();
        if (state.deleting.length === 0) return;

        screenLoader.toggle();
        deleteAccounts(state.deleting)
            .then(() => {
                toast.success("Accounts deleted!");
                refreshAccounts();
                setState(defaultState);
            })
            .catch(() => {
                toast.error('failed to delete accounts');
            })
            .finally(screenLoader.toggle);

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