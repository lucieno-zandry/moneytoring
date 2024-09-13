import { ButtonGroup, ModalTitle } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { ModalBody, ModalFooter, ModalHeader } from "../Modal/Modal"
import FloatingForm from "../FormFloating/FormFloating";
import React from "react";
import formObservations from "../../core/helpers/formObservations";
import { Category } from "../../core/config/types/models";
import { fakeCategory } from "../../core/config/constants/fakes";
import { JsObject } from "../../core/config/types/variables";
import ModalContainer, { ModalContainerProps } from "../Modal/Container/Container";
import IconsDrawer, { icons } from "../IconsDrawer/IconsDrawer";
import IconButton from "../IconInput/IconInput";

interface CategoryModalProps extends Omit<ModalContainerProps, 'onSubmit'> {
    onSubmit: (category: Category) => void,
    category?: Category,
}

const defaultCategory: Category = {
    ...fakeCategory,
    icon: '',
    name: '',
    budget: 0,
}

const CategoryModal = (props: CategoryModalProps) => {
    const {
        onSubmit,
        category = defaultCategory,
        show = false,
        ...modalProps
    } = props;

    const [state, setState] = React.useState({
        validationMessages: null as JsObject | null,
        showIconDrawer: false,
        paused: false,
        form: {
            icon: category.icon,
        }
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData, validationMessages } = formObservations(e);

        if (!validationMessages) {
            const newCategory: Category = {
                ...category,
                name: formData.name,
                budget: parseInt(formData.budget),
                icon: state.form.icon,
            }

            onSubmit(newCategory);
            props.onClose && props.onClose();
        }

        setState(s => ({ ...s, validationMessages }));
    }, [onSubmit, props.onClose, state.form.icon, category]);

    const handleIconSubmit = React.useCallback((selected: string = '') => {
        setState(s => ({ ...s, form: { icon: selected }, showIconDrawer: false, paused: false }));
    }, [props.onClose]);

    const toggleIconsDrawer = React.useCallback(() => {
        setState(s => ({ ...s, showIconDrawer: !s.showIconDrawer, paused: !s.paused }));
    }, []);

    React.useEffect(() => {
        if (!category.name) return;
        setState(s => ({ ...s, form: { icon: category.icon } }));
    }, [category]);

    const isVisible = React.useMemo(() => {
        if (state.paused) return false;
        return show;
    }, [state.paused, show]);

    const editMode = React.useMemo(() => Boolean(category.id), [category.id]);

    return <>
        <ModalContainer
            as="form"
            onSubmit={handleSubmit}
            align="center"
            show={isVisible}
            {...modalProps}>

            <ModalHeader withCloseButton>
                <ModalTitle>{editMode ? 'Edit' : 'Create'} category</ModalTitle>
            </ModalHeader>

            <ModalBody className="d-flex gap-3 justify-content-center">
                <ButtonGroup className="align-self-center">
                    <IconButton
                        iconProps={{ variant: state.form.icon || icons[0] }}
                    />
                    <Button onClick={toggleIconsDrawer}>{state.form.icon || 'Choose Icon'}</Button>
                </ButtonGroup>

                <FloatingForm.Input
                    id="category.name"
                    labelProps={{ label: <><Icon variant="input-text" /> Name</> }}
                    placeholder="Eg: Bank Category"
                    error={state.validationMessages?.name}
                    defaultValue={category.name}
                />

                <FloatingForm.Input
                    id="category.budget"
                    type="number"
                    labelProps={{ label: <><Icon variant="money-bill-simple" /> Budget</> }}
                    placeholder="Category budget"
                    error={state.validationMessages?.budget}
                    defaultValue={category.budget}
                />
            </ModalBody>

            <ModalFooter>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={props.onClose as React.MouseEventHandler<HTMLButtonElement>}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit">
                    <Icon variant="check-circle" /> Done
                </Button>
            </ModalFooter>
        </ModalContainer>
        <IconsDrawer
            show={state.showIconDrawer}
            onSubmit={handleIconSubmit}
            onClose={toggleIconsDrawer}
            defaultSelected={state.form.icon}
        />
    </>
}

export default CategoryModal;