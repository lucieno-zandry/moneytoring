import Button from "../../../../partials/Button/Button";
import Icon from "../../../../partials/Icon/Icon";
import { useNavigate } from "react-router-dom";
import * as links from '../../../../core/config/links/pages';
import useTransactionsHistory from "../../../../core/hooks/useTransactionsHistory";
import React from "react";
import useRefreshTransactionsHistory from "../../../../core/hooks/useRefreshTransactionsHistory";
import TransactionsHistoryTable from "../../../../partials/TransactionsHistoryTable/TransactionsHistoryTable";

const DISPLAY_HISTORY_COUNT = 5;

export default () => {
    const navigate = useNavigate();
    const { transactionsHistory } = useTransactionsHistory();
    const refreshHistory = useRefreshTransactionsHistory();

    React.useEffect(() => {
        if (transactionsHistory) return;
        refreshHistory();
    }, [transactionsHistory]);

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
            <TransactionsHistoryTable items={transactionsHistory?.slice(0, DISPLAY_HISTORY_COUNT) || null} />
        </div>
    </div>
}