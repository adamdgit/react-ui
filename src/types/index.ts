import type { ReactNode } from "react";
import type { DialogWrapper } from "../components/dialog";
import type { AccordionBody, AccordionHeader, AccordionItem } from "../components/accordion";
import type { SelectItem } from "../components/select";
import type { ToastContent } from "../components/toast";

/*-------- Accordion Types --------*/

type AccordionProps = {
    className?: string;
    /* Must have accordionItems as children only */
    children: React.ReactElement<typeof AccordionItem>[] | React.ReactElement<typeof AccordionItem>;
    style?: React.CSSProperties;
    /**
     * Controls how many items can be open at once:
     * - `multiple`: All items can be expanded simultaneously.
     * - `single`: Only one item can be expanded at a time.
    */
    mode: "multiple" | "single";
}

type AccordionItemProps = {
    className?: string;
    /* Must have accordionHeader & accordionBody as children */
    children: 
        [React.ReactElement<typeof AccordionHeader>, 
         React.ReactElement<typeof AccordionBody>];
    style?: React.CSSProperties;
};

type AccordionHeaderProps = {
    className? : string;
    children: ReactNode;
    style?: React.CSSProperties;
};

type AccordionBodyProps = {
    className?: string;
    children: ReactNode;
    style?: React.CSSProperties;
};

/*-------- Tooltip Types --------*/

type TooltipProps = {
    className?: string;
    children: ReactNode;
    style?: React.CSSProperties;
}

type TooltipPopupProps = {
    className?: string;
    style?: React.CSSProperties;
    content: string;
    position: "top-center" | "bottom-center";
    /**
     * Offsets the tooltip position by provided number as pixels
     * Gives you more control over the popup position
    */
    marginOffset?: number;
}

/*-------- Toast Types --------*/

type ToastProps = {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactElement<typeof ToastContent>;
    /**
     * Window absolute position of the toast
    */
    position: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
    /**
     * Time before toast auto-hides in milliseconds
    */
    timeoutDuration: number;
    showToast: boolean;
    /**
     * Show a visual progress bar, which displays the Toast auto-hide timeout
    */
    progressBar: boolean;
    onClose: () => void;
}

type ToastContentProps = {
    className?: string;
    children: ReactNode
}

/*-------- Select Types --------*/

type SelectProps = {
    className?: string;
    /* Must have SelectItems as children */
    children: React.ReactElement<typeof SelectItem>[] | React.ReactElement<typeof SelectItem>;
    id: string;
    /**
     * Inital label shown on dropdown before selection
    */
    label: string;
    defaultValue?: string | number;
    /**
     * Returns value of the selected option onchange
    */
    onChange: (value: string) => void;
}

type SelectItemProps = {
    className?: string;
    children: ReactNode;
    value: string | number;
}

/*-------- Dialog Types --------*/

type DialogProps = {
    className?: string;
    children: React.ReactElement<typeof DialogWrapper>;
    style?: React.CSSProperties;
    showDialog: boolean;
    /**
     * Runs when the dialog has been closed
    */
    onClose: () => void;
};

type DialogWrapperProps = {
    children: ReactNode
};

type DialogButtonProps = {
    className?: string;
}

export type {
    AccordionProps,
    AccordionItemProps,
    AccordionHeaderProps,
    AccordionBodyProps,
    TooltipProps,
    TooltipPopupProps,
    ToastProps,
    ToastContentProps,
    SelectProps,
    SelectItemProps,
    DialogProps,
    DialogWrapperProps,
    DialogButtonProps
}