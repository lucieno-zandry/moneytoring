import React from "react";

export type ModalFooterProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement | HTMLFormElement>, any> & { as?: 'div' | 'form' }

const ModalFooter = (props: ModalFooterProps) => {
    const { className = '', as = 'div', ...elementProps } = props;

    const Element = React.useMemo(() => as, [as]);

    return <Element
        className={`modal-footer ${className}`}
        {...elementProps}
    />
};

export default ModalFooter;