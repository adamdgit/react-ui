import { useContext, useEffect, useRef, useState } from "react";
import styles from "./dialog.module.css";
import type { DialogButtonProps, DialogProps, DialogWrapperProps } from "../../types";
import { DialogContext, DialogWrapperContext } from "../../context";

function Dialog({ className, children, style, showDialog, onClose }: DialogProps) {
    const [show, setShow] = useState(showDialog);
    const ref = useRef<HTMLDivElement>(null);

    // Listen for show Dialog updates from parent components
    useEffect(() => {
        setShow(showDialog);
        if (!showDialog) {
            onClose();
        }
    },[showDialog])

    function handleOnBlur(e: React.MouseEvent<HTMLDivElement>) {
        // Because dialog component uses inset 0 it fills the entire page
        // hide if target is dialog, else target is child, don't hide
        if (e.target === ref.current) {
            onClose();
        }
    }
    
    if (show) {
        return (
            <DialogContext.Provider value={{ onClose, setShow }}>
                <div
                    ref={ref}
                    style={style}
                    className={className ?? styles.dialog} 
                    onClick={handleOnBlur}
                >
                    {children}
                </div>
            </DialogContext.Provider>
        )
    }
};

function DialogWrapper({ children, className, style }: DialogWrapperProps) {
    const context = useContext(DialogContext);
    if (!context) throw new Error("DialogWrapper must be a child of Dialog component")

    const { onClose, setShow } = context;

    return (
        <DialogWrapperContext.Provider value={{ onClose, setShow }}>
            <div 
                style={style}
                className={className ?? styles.dialogWrapper}
            >
                {children}
            </div>
        </DialogWrapperContext.Provider>
    )
};

function DialogCloseButton({ className, style }: DialogButtonProps) {
    const context = useContext(DialogWrapperContext);
    if (!context) throw new Error("DialogCloseButton must be a child of DialogWrapper component");

    const { onClose, setShow } = context;

    function handleCloseDialog() {
        setShow(false);
        onClose();
    }

    return (
        <button 
            onClick={handleCloseDialog}
            style={style}
            className={className ?? styles.dialogBtn}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={12} viewBox="0 0 384 512">{'<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->'}<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>
    )
};

export {
    Dialog,
    DialogWrapper,
    DialogCloseButton
}