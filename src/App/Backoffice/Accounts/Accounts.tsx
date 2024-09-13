import React from "react";
import Table from "../../../partials/Table/Table";
import AccountRow from "../../../partials/AccountRow/AccountRow";
import { Account } from "../../../core/config/types/models";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import AccountModal from "../../../partials/AccountModal/AccountModal";
import Motion from "../../../partials/Motion/Motion";
import useAccounts from "../../../core/hooks/useAccounts";

const Accounts = React.memo(() => {
    const { setAccounts, accounts } = useAccounts(state => state);

    const [state, setState] = React.useState({
        editing: undefined as Account | undefined,
        creating: false,
    });

    const handleEdit = React.useCallback((editing: Account) => {
        setState(s => ({ ...s, editing, creating: false }));
    }, []);

    const handleDelete = React.useCallback((accounts: Account[]) => {
        console.log(accounts);
    }, []);

    const handleSubmit = React.useCallback((account: Account) => {
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

    return <Motion.Main className="accounts">
        <Table
            headers={['', 'name', 'budget']}
            TDs={AccountRow}
            items={accounts}
            onDelete={handleDelete}
            onEdit={handleEdit} />

        <CornerButtons>
            <Button variant="primary" onClick={toggleCreating}><Icon variant="plus-circle" /> Account</Button>
        </CornerButtons>

        <AccountModal
            show={Boolean(state.creating || state.editing)}
            onSubmit={handleSubmit}
            onClose={handleClose}
            account={state.editing} />
    </Motion.Main>
})

export default Accounts;