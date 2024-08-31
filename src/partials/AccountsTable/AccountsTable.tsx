import { Account } from "../../core/config/types/models"
import AccountRow from "../AccountRow/AccountRow";

type Props = {
    accounts: Account[],
    hideThead?: boolean,
}

export default function (props: Props & React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>) {
    const { accounts, hideThead = false, className = '', ...tableProps} = props;

    return <table className={`table table-stripped table-hover table-dark ${className}`} {...tableProps}>
        {!hideThead && <thead>
            <tr>
                <th>name</th>
                <th>balance</th>
            </tr>
        </thead>}
        <tbody>
            {accounts.map((account, key) => <AccountRow account={account} key={key} />)}
        </tbody>
    </table>
}