import React from "react";
import CornerButtons from "../../../partials/CornerButtons/CornerButtons";
import Button from "../../../partials/Button/Button";
import Icon from "../../../partials/Icon/Icon";
import { Category } from "../../../core/config/types/models";
import CategoryModal from "../../../partials/CategoryModal/CategoryModal";
import randomNumber from "../../../core/helpers/randomNumber";
import Table from "../../../partials/Table/Table";
import generateArray from "../../../core/helpers/generateArray";
import CategoryRow from "../../../partials/CategoryRow/CategoryRow";
import arrayUpdate from "../../../core/helpers/arrayUpdate";
import { fakeCategory } from "../../../core/config/constants/fakes";
import { StepProps } from "../Setup";

const defaultCategories = (accountBudget: number = 0) => {
    return [
        {
            ...fakeCategory,
            "budget": Math.floor(accountBudget / 4),
            "name": "Transport",
            "icon": "car",
            id: randomNumber()
        },
        {
            ...fakeCategory,
            "budget": Math.floor(accountBudget / 8),
            "name": "Entertainment",
            "icon": "music",
            id: randomNumber()
        },
        {
            ...fakeCategory,
            "budget": Math.floor(accountBudget / 4),
            "name": "Bills",
            "icon": "lightbulb",
            id: randomNumber()
        },
        {
            ...fakeCategory,
            "budget": Math.floor(accountBudget / 4),
            "name": "Food",
            "icon": "leaf",
            id: randomNumber()
        }
    ]
};

const CategoryCreation = React.memo((props: StepProps) => {
    const { onDone } = props;

    const balance = React.useMemo(() => randomNumber(6), []);

    const [state, setState] = React.useState({
        creationMode: false,
        categories: defaultCategories(balance) as Category[],
        editingCategory: undefined as Category | undefined,
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

    return <>
        <div className="category-creation col-12">
            <h3 className="display-6">Setup your categories</h3>
            <p className="text-muted">
                Categories allow you to configure a budget for a specific purpose.
                The following list contains some of our suggested categories, the budgets are set according to your account balance.</p>
            {categories && categories.length > 0 &&
                <Table
                    headers={generateArray(3)}
                    items={categories}
                    TDs={CategoryRow}
                    onDelete={handleDelete}
                    onEdit={setEditingCategory} />}
        </div>

        <CornerButtons>
            <Button
                variant="secondary"
                onClick={toggleCreationMode}><Icon variant="plus" /> Category</Button>

            <Button
                variant="primary"
                disabled={!categories || categories.length < 1}
                onClick={onDone}>
                Done <Icon variant="check-circle" />
            </Button>
        </CornerButtons>

        <CategoryModal
            onSubmit={editMode ? handleEditSubmit : addCategory}
            category={editingCategory}
            show={editMode || creationMode}
            onClose={editMode ? disableEditMode : toggleCreationMode}
            editMode={editMode} />
    </>
});

export default CategoryCreation;