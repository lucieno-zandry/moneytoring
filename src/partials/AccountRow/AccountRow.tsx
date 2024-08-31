import { Account } from "../../core/config/types/models"
import Amount from "../Amount/Amount";

type Props = {
    account: Account
}

export default function (props: Props) {
    const { balance, name } = props.account;

    return <tr>
        <td>
            {name}
        </td>
        <td>
            <Amount>{balance}</Amount>
        </td>
    </tr>
}