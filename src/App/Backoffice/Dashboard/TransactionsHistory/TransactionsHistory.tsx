import TransactionsTable from "../../../../partials/TransactionTables/TransactionsTable";
import useTransactions from "../../../../core/hooks/useTransactions";
import Button from "../../../../partials/Button/Button";
import Icon from "../../../../partials/Icon/Icon";
import { useNavigate } from "react-router-dom";
import * as links from '../../../../core/config/links/pages';

export default () => {
    const { transactions } = useTransactions();
    const navigate = useNavigate();

    return <div className="mt-3 bg-dark rounded p-2">
        <h5
            className="display-5 d-flex justify-content-between align-items-center flex-wrap-reverse flex-sm-nowrap">
            Transactions history <Button
                size="sm"
                variant="outline-light"
                className="mb-2 mb-sm-0"
                onClick={() => navigate(links.transactions)}>
                <Icon variant="eye" /> view more</Button>
        </h5>
        <p className="text-muted mb-3">Since last week</p>
        <div className="table-responsive">
            <TransactionsTable items={transactions?.slice(0, 10) || null} />
        </div>
    </div>
}