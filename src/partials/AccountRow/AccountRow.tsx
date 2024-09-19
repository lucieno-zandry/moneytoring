import React from "react";
import { Account } from "../../core/config/types/models"
import useNumberFormat from "../../core/hooks/useNumberFormat";
import Icon from "../Icon/Icon";

type Props = {
    item: Account
}

export default React.memo((props: Props) => {
    const { balance, name, icon } = props.item;
    const { toAmount } = useNumberFormat();

    return <>
        <td>
            <Icon variant={icon} />
        </td>
        <td>
            {name}
        </td>
        <td>
            {toAmount(balance)}
        </td>
    </>
})