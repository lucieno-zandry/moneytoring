import { TransactionHistory } from "../../core/config/types/models";
import TransactionRow from "../TransactionRow/TransactionRow";

type Props = {
    item: TransactionHistory
}

export default(props: Props) => {
    return <TransactionRow item={props.item.transaction}/>
}