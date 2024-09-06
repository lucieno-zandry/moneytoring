import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import { Dropdown } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { AnimatePresence, motion, Variants } from "framer-motion";

type TDS<T> = (props: { item: T }) => React.JSX.Element
type OnDelete<T> = (items: T[]) => void;
type OnEdit<T> = (item: T) => void;

type Props<T extends { id: number }> = {
    items: T[],
    headers: React.ReactNode[],
    TDs: TDS<T>,
    onDelete: OnDelete<T>,
    onEdit: OnEdit<T>,
} & React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>

const variants = (key: number): Variants => {
    return {
        hidden: {
            x: '100%',
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: .2 * key,
                type: 'spring',
                duration: .3
            }
        }
    }
}

export default function <T extends { id: number }>(props: Props<T>) {
    const { items, headers, TDs, onDelete, className = '', onEdit, ...tableProps } = props;

    const [state, setState] = React.useState({
        selection: null as null | T[],
    });

    const { selection } = state;

    const setSelection = React.useCallback((selection: T[] | null) => {
        setState(s => ({ ...s, selection }));
    }, []);

    const toggleSelect = React.useCallback(() => {
        setSelection(state.selection ? null : [])
    }, [state.selection, setSelection]);

    const handleSelectAll = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setSelection(checked ? items : []);
    }, [items, setSelection]);

    const handleDeleteItems = React.useCallback(() => {
        if (state.selection) {
            onDelete && onDelete(state.selection);
            setSelection(null);
        }
    }, [state.selection, setSelection, onDelete]);

    const addToSelection = React.useCallback((item: T) => {
        if (selection && !selection.some(selected => selected.id === item.id)) {
            const newSelection = [...selection];
            newSelection.push(item);
            setSelection(newSelection);
        }
    }, [selection, setSelection]);

    const removeFromSelection = React.useCallback((item: T) => {
        if (selection && selection.some(selected => selected.id === item.id)) {
            setSelection([...selection].filter(selected => selected.id !== item.id));
        }
    }, [selection, setSelection]);

    const handleSelection = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, item: T) => {
        e.target.checked ? addToSelection(item) : removeFromSelection(item);
    }, [addToSelection, removeFromSelection]);

    const handleDeleteUnique = React.useCallback((item: T) => {
        onDelete && onDelete([item]);
        if (selection) {
            setSelection(null);
        }
    }, [selection, onDelete]);

    const handleEdit = React.useCallback((item: T) => {
        onEdit && onEdit(item);
    }, [onEdit]);

    return <div className="table-responsive">
        <table
            className={`table table-stripped table-hover table-dark align-middle ${className}`}
            {...tableProps}>
            <thead>
                <tr>
                    {state.selection && <th className="col-1">
                        <Checkbox
                            label='All'
                            checked={state.selection.length === items?.length}
                            onChange={handleSelectAll}
                        />
                    </th>}

                    {headers.map((header, key) => <th key={key}>{header}</th>)}

                    <th className="col-2 text-align-center">
                        {state.selection ?
                            <Button
                                variant="danger"
                                onClick={handleDeleteItems}
                                disabled={state.selection?.length === 0}>
                                <Icon variant="trash" /> Delete
                            </Button> :
                            <Button
                                variant="outline-light"
                                onClick={toggleSelect}>
                                Select
                            </Button>}
                    </th>
                </tr>
            </thead>
            <tbody>
                <AnimatePresence>
                    {items.map((item: T, key) => {
                        const checked = selection?.some(selected => selected.id === item.id);

                        return <motion.tr
                            key={key}
                            variants={variants(key)}
                            initial="hidden"
                            animate="visible"
                            exit="hidden">
                            {selection && <td>
                                <Checkbox
                                    label=''
                                    checked={checked}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelection(e, item)}
                                />
                            </td>}
                            <TDs item={item} />
                            <td className="text-align-center">
                                <Dropdown className="actions-dropdown">
                                    <Dropdown.Toggle variant="">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleEdit(item)}>
                                            <Icon variant="pencil" /> Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item className="text-danger" onClick={() => handleDeleteUnique(item)}>
                                            <Icon variant="trash" /> Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </motion.tr>
                    }
                    )}
                </AnimatePresence>
            </tbody>
        </table>
    </div>
}