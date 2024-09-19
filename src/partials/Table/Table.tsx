import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import { Dropdown } from "react-bootstrap";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useSearch from "../../core/hooks/useSearch";
import hasMatched from "../../core/helpers/hasMatched";
import TablePlaceholder from "../TablePlaceholder/TablePlaceholder";
import ListEmpty from "../ListEmpty/ListEmpty";

type TDS<T> = (props: { item: T }) => JSX.Element

export type TableProps<T extends { id: number }> = {
    items: T[] | null,
    headers: React.ReactNode[],
    TDs: TDS<T> | React.MemoExoticComponent<TDS<T>>,
    onDelete?: (items: T[]) => void,
    onEdit?: (item: T) => void,
} & React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>

const fadeAnimationDuration = .6;

const variants = (key: number): Variants => {
    return {
        hidden: {
            y: '-3rem',
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: (.2 * key) + fadeAnimationDuration,
                type: 'spring',
                duration: .3
            }
        },
        exit: {
            y: '3rem',
            opacity: 0,
        }
    }
}

export default <T extends { id: number }>(props: TableProps<T>) => {
    const { items, headers, TDs, onDelete, className = '', onEdit, ...tableProps } = props;
    const { search } = useSearch();

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

    const hasActions = React.useMemo(() => Boolean(onDelete || onEdit), [onDelete, onEdit]);
    if (!items) return <TablePlaceholder />

    if (items.length === 0) return <ListEmpty />

    return <table
        className={`table table-stripped table-hover table-dark align-middle ${className}`}
        {...tableProps}>
        <thead>
            <tr className="rounded">
                {(hasActions && state.selection) && <th className="col-1">
                    <Checkbox
                        label='All'
                        checked={state.selection.length === items.length}
                        onChange={handleSelectAll}
                    />
                </th>}

                {headers.map((header, key) => <th key={key}>{header}</th>)}

                {hasActions &&
                    <th className="col-2 text-align-center">
                        {state.selection ?
                            <Button
                                variant="danger"
                                onClick={handleDeleteItems}
                                disabled={state.selection?.length === 0}
                                size="sm"
                                className="d-flex d-md-inline gap-1 flex-nowrap align-items-center">
                                <Icon variant="trash" /> Delete
                            </Button> :
                            <Button
                                variant="outline-light"
                                onClick={toggleSelect}
                                size="sm"
                                className="d-flex d-md-inline gap-1 flex-nowrap align-items-center">
                                <Icon variant="tasks" /> Select
                            </Button>}
                    </th>}
            </tr>
        </thead>
        <tbody>
            <AnimatePresence>
                {items.map((item: T, key) => {
                    const checked = selection?.some(selected => selected.id === item.id);
                    const element = <motion.tr
                        key={key}
                        variants={variants(key)}
                        initial="hidden"
                        animate="visible"
                        exit="exit">

                        {selection && <td>
                            <Checkbox
                                label=''
                                checked={checked}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelection(e, item)}
                            />
                        </td>}

                        <TDs item={item} />

                        {hasActions &&
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
                            </td>}
                    </motion.tr>

                    if (!search) return element;

                    const values: unknown[] = Object.values(item);
                    if (hasMatched(values, search)) return element;
                }
                )}
            </AnimatePresence>
        </tbody>
    </table>
}