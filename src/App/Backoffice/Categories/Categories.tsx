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
import { createCategories, deleteCategories, updateCategory } from "../../../core/api/actions";
import toast from "react-hot-toast";
import arrayUpdate from "../../../core/helpers/arrayUpdate";
import useScreenLoader from "../../../partials/ScreenLoader/hooks/useScreenLoader";
import useRefreshCategories from "../../../core/hooks/useRefreshCategories";

const defaultState = {
    editing: undefined as Category | undefined,
    creating: false,
    deleting: [] as Category[],
}

const Categories = React.memo(() => {
    const { setCategories, categories } = useCategories(state => state);
    const screenLoader = useScreenLoader();
    const refreshCategories = useRefreshCategories();

    const [state, setState] = React.useState(defaultState);

    const handleEdit = React.useCallback((editing: Category) => {
        setState(s => ({ ...s, editing, creating: false }));
    }, []);


    const handleSubmit = React.useCallback((category: Category) => {
        if (!categories) return;

        screenLoader.toggle();

        if (state.creating) {
            createCategories([category])
                .then(response => {
                    setCategories([...categories, ...response.data.categories]);
                    setState(defaultState);
                    toast.success('Category added!');
                })
                .catch(() => {
                    toast.error('Failed to create category!');
                })
                .finally(screenLoader.toggle)

            setCategories;
            category;
        } else {
            updateCategory(category)
                .then(response => {
                    const updated: Category = response.data.category;
                    setCategories(arrayUpdate(categories, updated, category => category.id === updated.id))
                })
                .catch(() => {
                    toast.error('Failed to update category!');
                })
                .finally(screenLoader.toggle)
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

    const handleDelete: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        e.preventDefault();

        if (state.deleting.length === 0) return;
        screenLoader.toggle();
        deleteCategories(state.deleting)
            .then(() => {
                toast.success("Categories deleted!");
                refreshCategories();
                setState(defaultState);
            })
            .catch(() => {
                toast.error("Failed to delete categories!")
            })
            .finally(screenLoader.toggle);
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