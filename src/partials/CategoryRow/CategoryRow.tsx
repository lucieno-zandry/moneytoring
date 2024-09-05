import { Category } from "../../core/config/types/models"
import Amount from "../Amount/Amount";
import Icon from "../Icon/Icon";

type Props = {
    item: Category
}

export default function (props: Props) {
    const { name, budget, icon } = props.item;

    return <>
        <td>
            {icon && <Icon variant={icon} />}
        </td>
        <td>
            {name}
        </td>
        <td>
            <Amount>{budget}</Amount>
        </td>
    </>
}   