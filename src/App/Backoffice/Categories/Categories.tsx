import React from "react";
import Table from "../../../partials/Table/Table";
import CategoryRow from "../../../partials/CategoryRow/CategoryRow";
import { Category } from "../../../core/config/types/models";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import CategoryModal from "../../../partials/CategoryModal/CategoryModal";
import Motion from "../../../partials/Motion/Motion";
import useCategories from "../../../core/hooks/useCategories";

const Categories = React.memo(() => {
    const { setCategories, categories } = useCategories(state => state);

    const [state, setState] = React.useState({
        editing: undefined as Category | undefined,
        creating: false,
    });

    const handleEdit = React.useCallback((editing: Category) => {
        setState(s => ({ ...s, editing, creating: false }));
    }, []);

    const handleDelete = React.useCallback((categories: Category[]) => {
        console.log(categories);
    }, []);

    const handleSubmit = React.useCallback((category: Category) => {
        if (state.creating) {

        } else {

        }
    }, [state.creating]);

    const toggleCreating = React.useCallback(() => {
        setState(s => ({ ...s, creating: !s.creating, editing: undefined }));
    }, []);

    const handleClose = React.useCallback(() => {
        setState(s => ({ ...s, creating: false, editing: undefined }));
    }, []);

    return <Motion.Main className="categories">
        <Table
            headers={['', 'name', 'budget']}
            TDs={CategoryRow}
            items={categories}
            onDelete={handleDelete}
            onEdit={handleEdit} />

        <CornerButtons>
            <Button variant="primary" onClick={toggleCreating}><Icon variant="plus-circle" /> Category</Button>
        </CornerButtons>

        <CategoryModal
            show={Boolean(state.creating || state.editing)}
            onSubmit={handleSubmit}
            onClose={handleClose}
            category={state.editing} />
    </Motion.Main>
})

export default Categories;