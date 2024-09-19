import React from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import IconInput from "../IconInput/IconInput";
import { ModalBodyProps } from "../Modal/Body/Body";
import { ModalContainerProps } from "../Modal/Container/Container";
import ModalContainer, { ModalBody, ModalFooter, ModalHeader } from "../Modal/Modal";
import { ModalTitle } from "react-bootstrap";
import SearchInput from "../SearchInput/SearchInput";
import { HTMLTag } from "../HTMLElement/HTMLElement";

export const icons = [
    "heart",
    "xmark",
    "circle",
    "square",
    "star",
    "check",
    "thumbs-up",
    "arrow-right",
    "plus",
    "minus",
    "envelope",
    "camera",
    "music",
    "car",
    "user",
    "home",
    "lock",
    "globe",
    "cog",
    "calendar",
    "bell",
    "comment",
    "file",
    "folder",
    "trash",
    "clock",
    "map",
    "paper-plane",
    "phone",
    "image",
    "video",
    "chart-line",
    "download",
    "upload",
    "search",
    "shopping-cart",
    "credit-card",
    "battery-half",
    "wifi",
    "cloud",
    "laptop",
    "mobile",
    "desktop",
    "truck",
    "medal",
    "microphone",
    "lightbulb",
    "book",
    "shield",
    "briefcase",
    "key",
    "paint-brush",
    "rocket",
    "rss",
    "trophy",
    "gift",
    "leaf",
    "anchor",
    "bicycle",
    "bed",
    "fire",
    "coffee",
    "plane",
    "snowflake",
    "suitcase",
    "code",
    "bug",
    "umbrella",
    "hospital",
    "medkit",
    "thumbs-down",
    "eye",
    "glasses",
    "building",
    "bullhorn",
    "cut",
    "link",
    "lock-open",
    "map-marker",
    "money-bill",
    "newspaper",
    "palette",
    "pencil-alt",
    "play",
    "plug",
    "save",
    "skull",
    "smile",
    "sticky-note",
    "sun",
    "thermometer",
    "tools",
    "truck-loading",
    "unlock",
    "volume-up",
    "wallet",
    "wrench",
    "crosshairs",
    "crow",
    "dice",
    "dollar-sign",
    "flag",
    "handshake",
    "headphones",
    'bank'
];

interface IconsDrawerProps extends Omit<ModalContainerProps<HTMLTag>, 'onSubmit'> {
    modalBodyProps?: ModalBodyProps,
    defaultSelected?: string,
    onSubmit: (selected?: string) => void,
}

export default function (props: IconsDrawerProps) {
    const { defaultSelected, modalBodyProps, onSubmit, ...modalContainerProps } = props;

    const [state, setState] = React.useState({
        selected: defaultSelected,
        search: '',
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        const { checked, value } = e.target;
        if (checked) {
            setState(s => ({ ...s, selected: value }));
        }
    }, []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
        e.preventDefault();
        onSubmit && onSubmit(state.selected);
    }, [state.selected, onSubmit]);

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        const { value } = e.target;
        setState(s => ({ ...s, search: value }));
    }, []);

    React.useEffect(() => {
        if (!defaultSelected) return;
        setState(s => ({ ...s, selected: defaultSelected }));
    }, [defaultSelected]);

    return <ModalContainer {...modalContainerProps} as="form" onSubmit={handleSubmit}>
        <ModalHeader className="flex-wrap gap-3">
            <ModalTitle>Choose an Icon</ModalTitle>
            <SearchInput
                onChange={handleSearch}
                containerProps={{ className: 'col-12 col-sm-5' }} />
        </ModalHeader>
        <ModalBody className="d-flex flex-wrap gap-2" {...modalBodyProps}>
            {icons.map((icon, key) => {
                const Input = <IconInput
                    iconProps={{ variant: icon }}
                    checked={state.selected === icon}
                    onChange={handleChange}
                    key={key}
                />

                if (state.search.length === 0) return Input;
                if (icon.toLowerCase().includes(state.search.toLowerCase())) return Input;
            })}
        </ModalBody>
        <ModalFooter>
            <Button
                variant="secondary"
                size="sm"
                onClick={props.onClose as React.MouseEventHandler<HTMLButtonElement> | undefined}>Cancel</Button>
            <Button
                variant="primary"
                type="submit">
                <Icon variant="check" /> Choose
            </Button>
        </ModalFooter>
    </ModalContainer>
}
