import Table, { TableProps } from "../Table/Table";
import { Category } from "../../core/config/types/models";
import CategoryRow from "../CategoryRow/CategoryRow";

const tableHeaders = ['', 'name', 'budget'];

type AccountsTableProps = Omit<TableProps<Category>, 'TDs' | 'headers'>

export default (props: AccountsTableProps) => {
    return <Table
        TDs={CategoryRow}
        headers={tableHeaders}
        {...props}
    />
}