import React from "react";

export default function () {
  const [state, setState] = React.useState(null as number | null);

  React.useEffect(() => (() => {
    if (state) {
      clearTimeout(state);
      setState(null);
    }
  }), [state]);

  return (callback: Function, timeout = 100) => {
    if (!state) {
      callback();
      setState(() => {
        const newState = setTimeout(() => setState(null), timeout);
        return newState;
      });
    }
  };
}
