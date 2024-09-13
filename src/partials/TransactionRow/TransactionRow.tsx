import { fakeTransactionRecurrence } from "../../core/config/constants/fakes";
import { Transaction } from "../../core/config/types/models"
import capitalize from "../../core/helpers/capitalize";
import Amount from "../Amount/Amount";
import Icon from "../Icon/Icon";
import SmallText from "../SmallText/SmallText";

type Props = {
    item: Transaction
}

export default function (props: Props) {
    const { icon, amount, description, transaction_recurrence = fakeTransactionRecurrence, type } = props.item;
    const { next_occurence, pattern } = transaction_recurrence;

    return <>
        <td>
            {icon && <Icon variant={icon} />}
        </td>
        <td>
            <Amount>{amount}</Amount>
        </td>
        <td>
            <SmallText maxLength={30}>{description}</SmallText>
        </td>
        <td>
            {next_occurence ? new Date(next_occurence)?.toLocaleDateString() : "Doesn't repeat"}
        </td>
        <td>
            {capitalize(pattern)}
        </td>
        <td>
            {capitalize(type)}
        </td>
    </>
}