import React from "react";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import { Account } from "../../../core/config/types/models";
import AccountModal from "../../../partials/AccountModal/AccountModal";
import Table from "../../../partials/Table/Table";
import generateArray from "../../../core/helpers/generateArray";
import AccountRow from "../../../partials/AccountRow/AccountRow";
import arrayUpdate from "../../../core/helpers/arrayUpdate";
import { StepProps } from "../Setup";
import { defaultAccounts } from "../../../core/hooks/useAccounts";


const AccountCreation = React.memo((props: StepProps) => {
    const { onDone } = props;

    const [state, setState] = React.useState({
        creationMode: false,
        accounts: defaultAccounts,
        editingAccount: undefined as Account | undefined,
    });

    const { editingAccount, accounts, creationMode } = state;

    const toggleCreationMode = React.useCallback(() => {
        setState(s => ({ ...s, creationMode: !s.creationMode }));
    }, []);

    const addAccount = React.useCallback((account: Account) => {
        const newAccounts = state.accounts ? [...state.accounts, account] : [account];
        setState(s => ({ ...s, accounts: newAccounts }));
    }, [state.accounts]);

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

    const handleEditSubmit = React.useCallback((account: Account) => {
        if (!editingAccount) return;
        const newAccounts = arrayUpdate(accounts, account, (account) => account.id === editingAccount?.id);
        setState(s => ({ ...s, accounts: newAccounts, editingAccount: undefined }));
    }, [editingAccount]);

    const editMode = React.useMemo(() => Boolean(editingAccount), [editingAccount]);

    return <>
        <div className="account-creation col-12">
            <h3 className="display-6">Establish your balance.</h3>
            <p className="text-muted">
                At least one (1) account is mandatory to get started. <br />
                Accounts should represent your current balance.
                You can create as many accounts as you wish, no one but you will be able to see your personal data. <br />
                We have created these accounts for you, you can customize them or remove them.

            </p>
            {state.accounts && state.accounts.length > 0 &&
                <Table
                    headers={generateArray(3)}
                    items={state.accounts}
                    TDs={AccountRow}
                    onDelete={handleDelete}
                    onEdit={setEditingAccount}
                />}
        </div>

        <CornerButtons>
            <Button
                variant="secondary"
                onClick={toggleCreationMode}>
                <Icon variant="plus" /> Account
            </Button>

            <Button
                variant="primary"
                disabled={state.accounts.length < 1}
                onClick={onDone}>
                Done <Icon variant="check-circle" />
            </Button>
        </CornerButtons>

        <AccountModal
            onSubmit={editMode ? handleEditSubmit : addAccount}
            account={editingAccount}
            show={editMode || creationMode}
            onClose={editMode ? disableEditMode : toggleCreationMode}
            editMode={editMode} />
    </>
});

export default AccountCreation;