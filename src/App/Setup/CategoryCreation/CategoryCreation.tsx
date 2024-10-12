import React from "react";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import { Category } from "../../../core/config/types/models";
import CategoryModal from "../../../partials/CategoryModal/CategoryModal";
import arrayUpdate from "../../../core/helpers/arrayUpdate";
import useCategories from "../../../core/hooks/useCategories";
import useAccounts from "../../../core/hooks/useAccounts";
import CategoriesTable from "../../../partials/CategoriesTable/CategoriesTable";
import generateCategories from "../../../core/helpers/generateCategories";
import Motion from "../../../partials/Motion/Motion";
import { slideNext } from "../../../core/config/variants/variants";
import { createCategories } from "../../../core/api/actions";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const CategoryCreation = React.memo(() => {
    const { setCategories } = useCategories();

    const { accounts } = useAccounts();

    const [state, setState] = React.useState({
        creationMode: false,
        categories: generateCategories(accounts),
        editingCategory: undefined as Category | undefined,
        isLoading: false,
    });

    const { categories, creationMode, editingCategory } = state;

    const toggleCreationMode = React.useCallback(() => {
        setState(s => ({ ...s, creationMode: !s.creationMode }));
    }, []);

    const addCategory = React.useCallback((category: Category) => {
        const newCategories = categories ? [...categories, category] : [category];
        setState(s => ({ ...s, categories: newCategories }));
    }, [categories]);

    const handleDelete = React.useCallback((categories: Category[]) => {
        if (!state.categories.length || !categories.length) return;

        let newCategories = [...state.categories];

        categories.forEach(category => {
            newCategories = newCategories.filter(c => c.id !== category.id);
        });

        setState(s => ({ ...s, categories: newCategories }));
    }, [state.categories]);

    const setEditingCategory = React.useCallback((category: Category) => {
        setState(s => ({ ...s, editingCategory: category, creationMode: false }));
    }, []);

    const disableEditMode = React.useCallback(() => {
        setState(s => ({ ...s, editingCategory: undefined, creationMode: false }));
    }, [])

    const handleEditSubmit = React.useCallback((category: Category) => {
        if (!editingCategory) return;
        const newCategories = arrayUpdate(categories, category, (category) => category.id === editingCategory?.id);
        setState(s => ({ ...s, categories: newCategories, editingCategory: undefined }));
    }, [editingCategory]);

    const editMode = React.useMemo(() => Boolean(editingCategory), [editingCategory]);

    const handleSubmit = React.useCallback(() => {
        if (state.categories.length === 0) return;
        setState(s => ({ ...s, isLoading: true }));

        createCategories(state.categories)
            .then(response => {
                const categories: Category[] = response.data.categories;
                setCategories(categories);
            })
            .catch((error: AxiosError) => {
                toast.error(`An error occurred: ${error.message}`)
            })
            .finally(() => {
                setState(s => ({ ...s, isLoading: false }));
            })
    }, [setCategories, state.categories]);

    return <>
        <Motion.Div className="container category-creation col-12" variants={slideNext}>
            <h3 className="display-6">Setup your categories</h3>
            <p className="text-muted">
                Categories allow you to configure a budget for a specific purpose.
                The following list contains some of our suggested categories, the budgets are set according to your account balance.</p>
            {categories && categories.length > 0 &&
                <CategoriesTable
                    items={categories}
                    onDelete={handleDelete}
                    onEdit={setEditingCategory} />}
        </Motion.Div>

        <CornerButtons className="container">
            <Button
                variant="secondary"
                onClick={toggleCreationMode}
                size="sm"><Icon variant="plus" /> Category</Button>

            <Button
                variant="primary"
                disabled={!categories || categories.length < 1}
                onClick={handleSubmit}
                size="sm"
                isLoading={state.isLoading}>
                Done <Icon variant="check-circle" />
            </Button>
        </CornerButtons>

        <CategoryModal
            onSubmit={editMode ? handleEditSubmit : addCategory}
            category={editingCategory}
            show={editMode || creationMode}
            onClose={editMode ? disableEditMode : toggleCreationMode} />
    </>
});

export default CategoryCreation;