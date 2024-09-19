import Logo from "../../partials/Logo/Logo";
import AccountCreation from "./AccountCreation/AccountCreation";
import CategoryCreation from "./CategoryCreation/CategoryCreation";
import TransactionCreation from "./TransactionCreation/TransactionCreation";
import useSteps from "../../core/hooks/useSteps";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { accountsSetup, categoriesSetup, dashboard, transactionsSetup } from "../../core/config/links/pages";

export type StepProps = {
    onDone: () => void;
}

const Steps = [
    { path: accountsSetup, element: AccountCreation },
    { path: categoriesSetup, element: CategoryCreation },
    { path: transactionsSetup, element: TransactionCreation },
]

const Setup = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const defaultActive: number = React.useMemo(() => {
        const index = Steps.findIndex(item => item.path === location.pathname);
        return index >= 0 ? index : 0
    }, [location.pathname]);

    const { Container, active, next } = useSteps(Steps, { defaultActive });

    const handleDone = React.useCallback(() => {
        if (active < (Steps.length - 1)) {
            next();
            window.history.replaceState({}, '', Steps[active + 1].path);
        } else {
            navigate(dashboard);
        }
    }, [active, next]);

    
    return <div className="setup">
        <Logo isStatic={false} />
        <Container predicate={(Step) => <Step.element onDone={handleDone} />} className="container" />
    </div>
}

export default Setup;