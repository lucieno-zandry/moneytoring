import React from "react";
import CornerButtons from "../CornerButtons/CornerButtons";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import AccountsTable from "../AccountsTable/AccountsTable";
import { Account } from "../../core/config/types/models";
import { fakeAccount } from "../../core/config/constants/fakes";
import { useModal } from "../Modal/Modal";
import AccountCreationModal from "../AccountCreationModal/AccountCreationModal";

const AccountCreation = React.memo(() => {
    const accounts: Account[] = [fakeAccount, fakeAccount, fakeAccount];

    const [state, setState] = React.useState({
        showModal: false,
    });

    const Modal = useModal();

    const toggleModal = React.useCallback(() => {
        setState(s => ({ ...s, showModal: !s.showModal }));
    }, []);

    return <>
        <div className="account-creation">
            <h3 className="display-6">Create A Budget Account</h3>
            <p className="text-muted">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum accusamus veniam impedit deleniti quos, in, adipisci quo illum similique explicabo sequi ipsam rem, nostrum quis eum quisquam illo? Mollitia, eos.</p>
            <hr />
            {accounts.length > 0 &&
                <AccountsTable className="w-75" accounts={accounts} hideThead />}
        </div>

        <CornerButtons>
            <Modal.Toggle
                className="btn btn-secondary"
                onClick={toggleModal}><Icon variant="plus" /> Account</Modal.Toggle>
                
            <Button
                variant="primary"
                disabled={accounts.length < 1}>
                Submit <Icon variant="arrow-right" />
            </Button>
        </CornerButtons>

        <AccountCreationModal
            Modal={Modal}
            onClose={toggleModal}
            show={state.showModal} />
    </>
});

export default AccountCreation;