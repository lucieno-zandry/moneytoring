import React from "react";
import StepsContainer from "../../partials/StepsContainer/StepsContainer";
import { motionStatic, slideNext, slidePrevious } from "../config/variants/variants";


export default function <T>(Steps: T[]) {

  const [state, setState] = React.useState({
    active: 0,
    variants: motionStatic,
  });

  const setActive = React.useCallback(
    (step: number) => {
      if (step < 0 || step >= Steps.length || step === state.active) return;

      setTimeout(() => {
        setState((s) => ({ ...s, active: step }));
      }, 0.3);
    },
    [state.active]
  );

  const next = React.useCallback(() => {
    setState(s => ({ ...s, variants: slideNext }))
    setActive(state.active + 1);
  }, [state.active, setActive]);

  const prev = React.useCallback(() => {
    setState(s => ({ ...s, variants: slidePrevious }))
    setActive(state.active - 1);
  }, [state.active, setActive]);

  const Container = React.useCallback((props: {
    predicate: (Step: T) => React.JSX.Element
  }) => {
    const { predicate } = props;
    return <StepsContainer
      Steps={Steps}
      getComponent={predicate}
      active={state.active}
      variants={state.variants} />
  }, [state, Steps]);

  return {
    active: state.active,
    next,
    prev,
    Container
  };
}
