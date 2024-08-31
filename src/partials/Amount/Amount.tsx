import { DEFAULT_CURRENCY, DEFAULT_LOCALES } from "../../core/config/constants/constants";

type Props = {
    children: number
}

export default function (props: Props) {
    const { children } = props;
    return children.toLocaleString(DEFAULT_LOCALES, {currency: DEFAULT_CURRENCY})
}