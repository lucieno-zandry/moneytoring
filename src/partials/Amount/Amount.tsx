import React from "react";
import useSetting from "../../core/hooks/useSetting";

type Props = {
    children: number
}

export default React.memo((props: Props) => {
    const { children } = props;
    const { setting } = useSetting();

    const format = React.useMemo(() => {
        const instance = new Intl.NumberFormat(setting.language, { style: "currency", currency: setting.currency });
        return instance.format;
    }, [setting]);

    return format(children)
});