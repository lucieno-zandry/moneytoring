import React from "react";
import Motion from "../../../partials/Motion/Motion";
import SummaryCards from "./SummaryCards/SummaryCards";
import TransactionsHistory from "./TransactionsHistory/TransactionsHistory";

const Dashboard = React.memo(() => {
    return <Motion.Main className="dashboard">
        <h3 className="display-4 mb-3">Dashboard</h3>
        <SummaryCards />
        <TransactionsHistory />
    </Motion.Main>
});

export default Dashboard;