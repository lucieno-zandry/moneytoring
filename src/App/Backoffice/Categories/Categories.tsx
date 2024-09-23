import React from "react";
import { Category } from "../../../core/config/types/models";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import CategoryModal from "../../../partials/CategoryModal/CategoryModal";
import Motion from "../../../partials/Motion/Motion";
import useCategories from "../../../core/hooks/useCategories";
import DeleteDialogue from "../../../partials/DeleteDialogue/DeleteDialogue";
import CategoriesTable from "../../../partials/CategoriesTable/CategoriesTable";

const Categories = React.memo(() => {
    const { setCategories, categories } = useCategories(state => state);

    const [state, setState] = React.useState({
        editing: undefined as Category | undefined,
        creating: false,
        deleting: [] as Category[],
    });

    const handleEdit = React.useCallback((editing: Category) => {
        setState(s => ({ ...s, editing, creating: false }));
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

    const setDeleting = React.useCallback((categories: Category[]) => {
        setState(s => ({ ...s, deleting: categories }));
    }, []);

    const handleDelete = React.useCallback(() => {
        if (state.deleting.length === 0) return;
    }, [state.deleting]);

    return <Motion.Main className="categories">
        <div className="display-4 mb-3">Categories</div>

        <CategoriesTable
            items={categories}
            onDelete={setDeleting}
            onEdit={handleEdit} />

        <CornerButtons>
            <Button variant="primary" onClick={toggleCreating}><Icon variant="plus-circle" /> Category</Button>
        </CornerButtons>

        <CategoryModal
            show={Boolean(state.creating || state.editing)}
            onSubmit={handleSubmit}
            onClose={handleClose}
            category={state.editing} />

        <DeleteDialogue
            body={<CategoriesTable
                items={state.deleting} />}

            onClose={() => setDeleting([])}
            show={state.deleting.length > 0}
            onSubmit={handleDelete}
        />
    </Motion.Main>
})

export default Categories;