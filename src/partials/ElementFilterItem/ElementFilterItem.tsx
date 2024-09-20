import React from "react";
import { Accordion, AccordionButtonProps, AccordionCollapseProps, AccordionItemProps } from "react-bootstrap";
import Checkbox, { CheckboxProps } from "../Checkbox/Checkbox";
import Icon from "../Icon/Icon";
import { Model } from "../../core/config/types/models";

type COmponentElement = Model & { name: string, icon: string }

type Props<T extends COmponentElement> = {
    items: T[],
    icon: string,
    eventKey: string,
    buttonLabel: React.ReactNode,
    accordionButtonProps?: AccordionButtonProps,
    accordionCollapseProps?: AccordionCollapseProps,
    accordionItemProps?: AccordionItemProps,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, item: T) => void,
    checked: (item: T) => boolean
} & Omit<CheckboxProps, 'onChange' | 'checked' | 'label'>;

export default React.memo(<T extends COmponentElement>(props: Props<T>) => {
    const { items, eventKey, icon, buttonLabel, checked, onChange, accordionButtonProps, accordionCollapseProps, accordionItemProps, ...checkboxProps } = props;

    return <Accordion.Item {...accordionItemProps} eventKey={eventKey} >
        <Accordion.Button {...accordionButtonProps}>
            <span>
                <Icon variant={icon} /> {buttonLabel}
            </span>
        </Accordion.Button>
        <Accordion.Collapse {...accordionCollapseProps} eventKey={eventKey} className="px-5">
            <>
                {items!.map(item => {
                    return <Checkbox
                        className="my-3"
                        {...checkboxProps}
                        label={<span><Icon variant={item.icon}/> {item.name} </span>}
                        key={item.id}
                        onChange={(e) => onChange(e, item)}
                        checked={checked(item)}
                    />
                })}
            </>
        </Accordion.Collapse>
    </Accordion.Item>
})