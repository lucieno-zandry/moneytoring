import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import { useModalContext } from "../Modal";

export type ModalHeaderProps = {
    withCloseButton?: boolean,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ModalHeader = (props: ModalHeaderProps) => {
    const { className = '', children, withCloseButton = false, ...divProps } = props;
    const { onClose } = useModalContext();

    return <div
        className={`modal-header ${className}`}
        {...divProps}>
        {children}
        {withCloseButton &&
            <Button className="modal-close" onClick={onClose as React.MouseEventHandler<HTMLButtonElement>}>
                <Icon variant="xmark" />
            </Button>}
    </div>
}

export default ModalHeader;