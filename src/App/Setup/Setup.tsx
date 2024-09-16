import Logo from "../../partials/Logo/Logo";
import AccountCreation from "./AccountCreation/AccountCreation";
import CategoryCreation from "./CategoryCreation/CategoryCreation";
import TransactionCreation from "./TransactionCreation/TransactionCreation";
import useSteps from "../../core/hooks/useSteps";
import { useParams } from "react-router-dom";
import React from "react";

export type StepProps = {
    onDone: () => void;
}

const Steps = [
    { path: 'accounts', element: AccountCreation },
    { path: 'categories', element: CategoryCreation },
    { path: 'transactions', element: TransactionCreation },
]

const Setup = () => {

    const step = useParams().step!;

    const defaultActive: number = React.useMemo(() => {
        const index = Steps.findIndex(item => item.path === step);
        return index >= 0 ? index : 0
    }, [step]);

    const { Container, active, next } = useSteps(Steps, { defaultActive });

    const handleDone = React.useCallback(() => {
        if (active < (Steps.length - 1)) {
            next();
            window.history.replaceState({}, '', `/setup/${Steps[active + 1].path}`);
        };
    }, [active, next]);


    return <div className="setup">
        <Logo isStatic={false}/>
        <Container predicate={(Step) => <Step.element onDone={handleDone} />} className="container"/>
    </div>
}

export default Setup;