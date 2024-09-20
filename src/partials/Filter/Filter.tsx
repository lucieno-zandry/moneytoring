import React from "react"
import { useModal } from "../Modal/Modal"
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

type FilterProps = {
    data: { categories?: Category[], accounts?: Account[] },
}

export default React.memo((props: FilterProps) => {
    const { data } = props;

    const Modal = useModal();
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

    if (models.length === 0) return;

    return <>
        <Modal.Toggle className="btn btn-outline-light">
            <Icon variant="filter" /> Filter
        </Modal.Toggle>

        <Modal.Container show>
            <Modal.Header withCloseButton>
                <ModalTitle>Filter Transactions</ModalTitle>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column gap-3 align-items-center">
                <div className="d-flex gap-3 flex-wrap flex-sm-nowrap align-items-center col-12">
                    <FormFloating
                        type="date"
                        id="date_from"
                        labelProps={{ label: <><Icon variant="calendar-minus" /> Date from</>, className: "col-12 col-sm-6" }} />

                    <FormFloating
                        type="date"
                        id="date_to"
                        labelProps={{ label: <><Icon variant="calendar-plus" /> Date to</>, className: "col-12 col-sm-6" }} />
                </div>

                <Accordion className="col-12">
                    {models.map((model, key) => {
                        const items = data[model]!;
                        const selected = state[model]!;
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
                <Button variant="secondary" size="sm">cancel</Button>
                <Button variant="primary" size="sm" type="submit"><Icon variant="filter" />save filter </Button>
            </Modal.Footer>
        </Modal.Container>
    </>
})