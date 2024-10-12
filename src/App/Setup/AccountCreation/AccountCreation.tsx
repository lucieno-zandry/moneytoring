import React from "react";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import { Account } from "../../../core/config/types/models";
import AccountModal from "../../../partials/AccountModal/AccountModal";
import arrayUpdate from "../../../core/helpers/arrayUpdate";
import useAccounts, { defaultAccounts } from "../../../core/hooks/useAccounts";
import AccountsTable from "../../../partials/AccountsTable/AccountsTable";
import { createAccounts } from "../../../core/api/actions";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useScreenLoader from "../../../partials/ScreenLoader/hooks/useScreenLoader";
import Motion from "../../../partials/Motion/Motion";
import { slideNext } from "../../../core/config/variants/variants";


const AccountCreation = React.memo(() => {
    const { setAccounts } = useAccounts();
    const { toggle } = useScreenLoader();

    const [state, setState] = React.useState({
        creationMode: false,
        accounts: defaultAccounts,
        editingAccount: undefined as Account | undefined,
    });

    const { editingAccount, accounts, creationMode } = state;

    const toggleCreationMode = React.useCallback(() => {
        setState(s => ({ ...s, creationMode: !s.creationMode }));
    }, []);

    const handleDelete = React.useCallback((accounts: Account[]) => {
        if (!state.accounts.length || !accounts.length) return;

        let newAccounts = [...state.accounts];

        accounts.forEach(account => {
            newAccounts = newAccounts.filter(a => a.id !== account.id);
        });

        setState(s => ({ ...s, accounts: newAccounts }));
    }, [state.accounts]);

    const setEditingAccount = React.useCallback((account: Account) => {
        setState(s => ({ ...s, editingAccount: account, creationMode: false }));
    }, []);

    const disableEditMode = React.useCallback(() => {
        setState(s => ({ ...s, editingAccount: undefined, creationMode: false }));
    }, [])

    const handleModalSubmit = React.useCallback((account: Account) => {
        if (editingAccount) {
            const newAccounts = arrayUpdate(accounts, account, (account) => account.id === editingAccount.id);
            setState(s => ({ ...s, accounts: newAccounts, editingAccount: undefined }));
        } else {
            setState(s => ({ ...s, accounts: [...s.accounts, account] }));
        }
    }, [editingAccount]);

    const editMode = React.useMemo(() => Boolean(editingAccount), [editingAccount]);

    const handleSubmit = React.useCallback(() => {
        if (state.accounts.length === 0) return;
        toggle();
        createAccounts(state.accounts)
            .then(response => {
                const newAccounts = response.data.created as Account[];
                setAccounts(newAccounts);
            })
            .catch(error => {
                if (error instanceof AxiosError) {
                    toast.error('Failed to create transaction');
                }
            })
            .finally(toggle);
    }, [state.accounts]);

    return <>
        <Motion.Div className="container account-creation col-12" variants={slideNext}>
            <h3 className="display-6">Establish your balance.</h3>
            <p className="text-muted">
                At least one (1) account is mandatory to get started. <br />
                Accounts should represent your current balance.
                You can create as many accounts as you wish, no one but you will be able to see your personal data. <br />
                We have created these accounts for you, you can customize them or remove them.

            </p>
            {state.accounts && state.accounts.length > 0 &&
                <AccountsTable
                    items={state.accounts}
                    onDelete={handleDelete}
                    onEdit={setEditingAccount}
                />}
        </Motion.Div>

        <CornerButtons className="container">
            <Button
                variant="secondary"
                onClick={toggleCreationMode}
                size="sm">
                <Icon variant="plus" /> Account
            </Button>

            <Button
                variant="primary"
                disabled={state.accounts.length < 1}
                onClick={handleSubmit}
                size="sm">
                Done <Icon variant="check-circle" />
            </Button>
        </CornerButtons>

        <AccountModal
            onSubmit={handleModalSubmit}
            account={editingAccount}
            show={editMode || creationMode}
            onClose={editMode ? disableEditMode : toggleCreationMode}
            editMode={editMode} />
    </>
});

export default AccountCreation;