import React from "react"
import Icon from "../Icon/Icon"
import useNumberFormat from "../../core/hooks/useNumberFormat";

export type SummaryCardProps = {
    icon: string,
    amount: number,
    title: string,
    observation: string,
}

export default React.memo((props: SummaryCardProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const { amount, icon, observation, title, className = '', ...divProps } = props;
    const { toAmount } = useNumberFormat();

    return <div
        className={`summary-card d-flex flex-column bg-secondary-dark rounded gap-3 p-2 ${className}`} {...divProps}>
        <Icon variant={icon} />
        <h6 className="display-6">{toAmount(amount)}</h6>
        <p>{title}</p>
        <small className="text-muted">{observation}</small>
    </div>
})