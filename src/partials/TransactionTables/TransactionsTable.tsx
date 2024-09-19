import Table, { TableProps } from "../Table/Table";
import TransactionRow from "../TransactionRow/TransactionRow";
import { Transaction } from "../../core/config/types/models";

const tableHeaders = ['', 'amount', 'account', 'category', 'description', 'next_occurence', 'recurrence', 'type'];

type TransactionsTableProps = Omit<TableProps<Transaction>, 'headers' | 'TDs'>

export default (props: TransactionsTableProps) => {

    return <Table
        headers={tableHeaders}
        TDs={TransactionRow}
        {...props} />
}
