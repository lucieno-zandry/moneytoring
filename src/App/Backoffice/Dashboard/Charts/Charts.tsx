import React from "react";
import CategoryChart from "./CategoryChart/CategoryChart";
import IncomeExpenseChart from "./IncomeExpenseChart/IncomeExpenseChart";

export default React.memo(() => {
    return <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
        <CategoryChart />
        <IncomeExpenseChart />
    </div>
})