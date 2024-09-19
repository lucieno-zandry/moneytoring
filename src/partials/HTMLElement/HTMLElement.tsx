import React from "react";

type ElementTypes = {
    div: HTMLDivElement,
    form: HTMLFormElement,
    ul: HTMLUListElement,
    li: HTMLLIElement,
    a: HTMLAnchorElement,
    button: HTMLButtonElement,
}

export type HTMLTag = keyof ElementTypes;

export interface HTMLElementProps<T extends HTMLTag> extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<ElementTypes[T]>, ElementTypes[T]>, 'ref'> {
    as?: T,
}

export default React.memo(<T extends HTMLTag>(props: HTMLElementProps<T>) => {
    const { as = 'div', ...variableElementProps } = props;

    const Element = as;
    const elementProps = React.useMemo(() => variableElementProps as any, [variableElementProps]);

    return <Element {...elementProps} />
});

