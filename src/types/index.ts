import type { ReactNode } from "react";

/*-------- Accordion Types --------*/

type AccordionProps = {
    className?: string;
    children: ReactNode;
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
    children: ReactNode;
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
    children: ReactNode;
    position: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
    /**
     * Duration in milliseconds
    */
    durationMS: number;
    showToast: boolean;
    /**
     * Show a visual progress bar, which displays the Toast auto-hide timeout
    */
    progressBar: boolean;
}

type ToastItemProps = {
    className?: string;
    children: ReactNode
}

/*-------- Select Types --------*/

type SelectProps = {
    className?: string;
    children: ReactNode;
    id: string;
    label: string;
    defaultValue?: string | number;
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
    children: ReactNode;
    style?: React.CSSProperties;
    showDialog: boolean;
    onClose: () => void;
};

type DialogWrapperProps = {
    children: ReactNode;
};

export type {
    AccordionProps,
    AccordionItemProps,
    AccordionHeaderProps,
    AccordionBodyProps,
    TooltipProps,
    TooltipPopupProps,
    ToastProps,
    ToastItemProps,
    SelectProps,
    SelectItemProps,
    DialogProps,
    DialogWrapperProps
}