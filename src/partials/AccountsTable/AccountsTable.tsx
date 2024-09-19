import Table, { TableProps } from "../Table/Table";
import AccountRow from "../AccountRow/AccountRow";
import { Account } from "../../core/config/types/models";

const tableHeaders = ['', 'name', 'balance'];
type AccountsTableProps = Omit<TableProps<Account>, 'TDs' | 'headers'>

export default (props: AccountsTableProps) => {
    return <Table
        TDs={AccountRow}
        headers={tableHeaders}
        {...props}
    />
}
