import React from "react";
import { fakeAccount, fakeCategory, fakeTransactionRecurrence } from "../../core/config/constants/fakes";
import { Transaction } from "../../core/config/types/models"
import capitalize from "../../core/helpers/capitalize";
import useNumberFormat from "../../core/hooks/useNumberFormat";
import Icon from "../Icon/Icon";
import SmallText from "../SmallText/SmallText";

type Props = {
    item: Transaction
}

export default React.memo((props: Props) => {
    console.log(props.item);
    const { icon, amount, description, transaction_recurrence = fakeTransactionRecurrence, type, account = fakeAccount, category = fakeCategory } = props.item;
    const { next_occurence, pattern } = transaction_recurrence;
    const { toAmount } = useNumberFormat();

    return <>
        <td>
            {icon && <Icon variant={icon} />}
        </td>
        <td>
            {toAmount(amount)}
        </td>
        <td>
            {account.icon && <Icon variant={account.icon} />} {account.name}
        </td>
        <td>
            {category.icon && <Icon variant={category.icon} />} {category.name}
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
})