import { createContext } from "react";

/*-------- Select Context --------*/

const SelectContext = createContext<{
    id: string;
    listItems: (HTMLLIElement | HTMLDivElement)[];
    setListItems: React.Dispatch<React.SetStateAction<(HTMLLIElement | HTMLDivElement)[]>>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (value: string) => void;
    showList: boolean;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    isControlled: boolean;
    setInternalVal: React.Dispatch<React.SetStateAction<string | number>>;
} | null>(null);

/*-------- Toast Context --------*/

const ToastContext = createContext<{
    showToast: boolean;
    timeoutDuration: number;
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
} | null>(null);

/*-------- Calendar Context --------*/

const CalendarContext = createContext<{
    onClose: () => void;
    onSelectYear: (value: string) => void;
    onSelectMonth: (value: string) => void;
    onSelectDay: (value: string) => void;
}| null>(null);

/*-------- Rating Context --------*/

const RatingContext = createContext<{
    onChange: (value: number) => void;
    ratingsList: HTMLButtonElement[];
    setRatingsList: React.Dispatch<React.SetStateAction<HTMLButtonElement[]>>;
    selectedRating: null | number;
    setSelectedRating:  React.Dispatch<React.SetStateAction<null | number>>;
} | null>(null);

export {
    SelectContext,
    ToastContext,
    TooltipContext,
    AccordionContext,
    AccordionItemContext,
    DialogContext,
    CalendarContext,
    RatingContext
}