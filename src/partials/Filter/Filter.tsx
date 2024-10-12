import React from "react"
import Modal from "../Modal/Modal"
import Icon from "../Icon/Icon";
import { Accordion, ModalTitle } from "react-bootstrap";
import FormFloating from "../FormFloating/FormFloating";
import ElementFilterItem from "../ElementFilterItem/ElementFilterItem";
import { Account, Category, Model } from "../../core/config/types/models";
import ucFirst from "../../core/helpers/ucFirst";
import Button from "../Button/Button";
import { MODELS_DATA } from "../../core/config/constants/constants";
import classList from "../../core/helpers/classList";
import type from "../../core/helpers/type";
import { ModalContainerProps } from "../Modal/Container/Container";
import formObservations from "../../core/helpers/formObservations";

export type FilterData = {
    date_from: string,
    date_to: string
} & FilterProps['data']

export type FilterProps = {
    data: { categories?: Category[], accounts?: Account[] },
    onSubmit: (filterData: FilterData) => void,
} & Omit<ModalContainerProps<'form'>, 'onSubmit'>

export default React.memo((props: FilterProps) => {
    const { data, onSubmit, ...modalProps } = props;
    const [state, setState] = React.useState(data);

    const addToSelected = React.useCallback((key: keyof FilterProps['data'], item: unknown) => {
        setState(s => {
            const previousState = s[key]!;
            return { ...s, [key]: [...previousState, item] }
        });
    }, []);

    const removeFromSelected = React.useCallback(<T extends Model>(key: keyof FilterProps['data'], item: T) => {
        setState(s => {
            const previousState = s[key]!;
            return { ...s, [key]: previousState.filter(selected => selected.id !== item.id) }
        })
    }, []);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, item: unknown) => {
        const { checked } = e.target;

        let key: keyof FilterProps['data'];
        const variableType = type(item);

        switch (variableType) {
            case 'Account':
                key = "accounts";
                break;

            default:
                key = "categories";
                break;
        }

        checked ? addToSelected(key, item) : removeFromSelected<Model>(key, item as Model)
    }, [addToSelected, removeFromSelected]);

    const models = React.useMemo(() => Object.keys(data), [data]) as (keyof FilterProps['data'])[];

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        const { formData } = formObservations(e);
        const filterData: FilterData = { ...state, date_from: formData.date_from, date_to: formData.date_to };
        onSubmit(filterData);
    }, [state, onSubmit]);

    if (models.length === 0) return;

    return <Modal {...modalProps} as="form" onSubmit={handleSubmit} size="sm">
        <Modal.Header withCloseButton>
            <ModalTitle>Filter Transactions</ModalTitle>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3 align-items-center">
            <div className="d-flex gap-3 flex-wrap flex-sm-nowrap align-items-center col-12">
                <FormFloating
                    type="date"
                    id="date_from"
                    labelProps={{ label: <><Icon variant="calendar-minus" /> Date from</>, className: "col-12 col-sm-6" }}
                    placeholder="date from" />

                <FormFloating
                    type="date"
                    id="date_to"
                    labelProps={{ label: <><Icon variant="calendar-plus" /> Date to</>, className: "col-12 col-sm-6" }}
                    placeholder="date to" />
            </div>

            <Accordion className="col-12">
                {models.map((model, key) => {
                    const items = data[model];
                    const selected = state[model];
                    if (!items || !selected) return;

                    const buttonLabel = `${classList(selected.length === items.length, 'All')} ${ucFirst(model)} ${classList(selected.length !== items.length, `(${selected.length}) selected`)}`

                    return <ElementFilterItem
                        buttonLabel={buttonLabel}
                        eventKey={key.toString()}
                        icon={MODELS_DATA[model].icon}
                        key={key}
                        items={items}
                        onChange={handleChange}
                        checked={(item) => selected.some(selectedItem => selectedItem.id === item.id)}
                    />
                })}
            </Accordion>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={props.onClose}>cancel</Button>
            <Button variant="primary" size="sm" type="submit"><Icon variant="filter" />save filter </Button>
        </Modal.Footer>
    </Modal>
})