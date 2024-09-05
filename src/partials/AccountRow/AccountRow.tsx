import { Account } from "../../core/config/types/models"
import Amount from "../Amount/Amount";
import Icon from "../Icon/Icon";

type Props = {
    item: Account
}

export default function (props: Props) {
    const { balance, name, icon } = props.item;

    return <>
        <td>
            <Icon variant={icon} />
        </td>
        <td>
            {name}
        </td>
        <td>
            <Amount>{balance}</Amount>
        </td>
    </>
}