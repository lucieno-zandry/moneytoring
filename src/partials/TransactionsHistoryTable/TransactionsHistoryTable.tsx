import { TransactionHistory } from "../../core/config/types/models";
import Table, { TableProps } from "../Table/Table";
import TransactionsHistoryRow from "../TransactionsHistoryRow/TransactionsHistoryRow";

const tableHeaders = ['', 'amount', 'account', 'category', 'description', 'next_occurence', 'recurrence', 'type'];

type TransactionsTableProps = Omit<TableProps<TransactionHistory>, 'headers' | 'TDs'>

export default (props: TransactionsTableProps) => {
    return <Table
        headers={tableHeaders}
        TDs={TransactionsHistoryRow}
        {...props} />
}
