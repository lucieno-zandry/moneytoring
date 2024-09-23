import React from "react";
import SummaryCard from "../../../../partials/SummaryCard/SummaryCard";
import useBalance from "../../../../core/hooks/useBalance";

export default React.memo(() => {
    const { balance } = useBalance();

    return <div className="rounded bg-dark p-2">
        <h4 className="dipslay-5">This week</h4>
        <p className="text-muted mb-3">Money usage summary</p>
        <div className="d-flex justify-content-between gap-3 flex-wrap flex-sm-nowrap">
            <SummaryCard
                icon="dollar-sign"
                amount={balance}
                title="Total balance"
                observation="-20% compared to last week"
                className="col col-xs-6" />

            <SummaryCard
                icon="arrow-down"
                amount={balance}
                title="Income"
                observation="-25% compared to last week"
                className="col col-xs-6" />

            <SummaryCard
                icon="arrow-up"
                amount={balance}
                title="Expense"
                observation="+30% compared to last week"
                className="col col-xs-6" />

            <SummaryCard
                icon="piggy-bank"
                amount={balance}
                title="Savings"
                observation="-10% compared to last week"
                className="col col-xs-6" />
        </div>
    </div>
});