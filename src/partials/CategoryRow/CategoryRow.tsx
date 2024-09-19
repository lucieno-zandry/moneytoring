import { Category } from "../../core/config/types/models"
import useNumberFormat from "../../core/hooks/useNumberFormat";
import Icon from "../Icon/Icon";

type Props = {
    item: Category
}

export default function (props: Props) {
    const { name, budget, icon } = props.item;
    const { toAmount } = useNumberFormat();

    return <>
        <td>
            {icon && <Icon variant={icon} />}
        </td>
        <td>
            {name}
        </td>
        <td>
            {toAmount(budget)}
        </td>
    </>
}   