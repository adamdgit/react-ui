import { createContext } from "react";

/*-------- Select Context --------*/

const SelectContext = createContext<{
    listItems: (HTMLLIElement | HTMLDivElement)[];
    setListItems: React.Dispatch<React.SetStateAction<(HTMLLIElement | HTMLDivElement)[]>>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (value: string) => void;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    showList: boolean;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

/*-------- Toast Context --------*/

const ToastContext = createContext<{
    timeoutDuration: number;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    progressBar: boolean;
    onClose: () => void;
} | null>(null);

/*-------- Tooltip Context --------*/

const TooltipContext = createContext<{
    elementSize: { width: number, height: number };
    ref: React.RefObject<HTMLDivElement | null>
} | null>(null);

/*-------- Accordion Context --------*/

const AccordionContext = createContext<{
    headers: HTMLButtonElement[];
    setHeaders: React.Dispatch<React.SetStateAction<HTMLButtonElement[]>>;
    mode: "multiple" | "single";
    openItemId: string | null;
    setOpenItemId: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

const AccordionItemContext = createContext<{
    isOpen: boolean;
    toggle: () => void;
    id: string
} | null>(null);

/*-------- Dialog Context --------*/

const DialogContext = createContext<{
    onClose: () => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const DialogWrapperContext = createContext<{
    onClose: () => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export {
    SelectContext,
    ToastContext,
    TooltipContext,
    AccordionContext,
    AccordionItemContext,
    DialogContext,
    DialogWrapperContext
}