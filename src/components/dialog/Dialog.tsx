import { useContext, useRef } from "react";
import styles from "./dialog.module.css";
import type { DialogButtonProps, DialogContentProps, DialogProps } from "../../types";
import { DialogContext } from "../../context";
import { convertThemeToCSSVars } from "../../utils/convertCSSVars";

//--------------------------------------------------------------------//

function Dialog({ className, children, style, showDialog, onClose, themeOverride }: DialogProps) {
    const ref = useRef<HTMLDivElement>(null);

    function handleOnBlur(e: React.MouseEvent<HTMLDivElement>) {
        // Because dialog component uses inset 0 it fills the entire page
        // hide if target is dialog, else target is child, don't hide
        if (e.target === ref.current) {
            onClose();
        }
    }

    // If user provides a theme override, updte the components theme variables
    const CSSVariables = themeOverride ? convertThemeToCSSVars(themeOverride) : {};

    if (showDialog) {
        return (
            <DialogContext.Provider value={{ onClose }}>
                <div
                    ref={ref}
                    style={{...style, ...CSSVariables}}
                    className={className ?? styles.dialog} 
                    onClick={handleOnBlur}
                >
                    {children}
                </div>
            </DialogContext.Provider>
        )
    }
};

//--------------------------------------------------------------------//

function DialogContent({ className, style, children }: DialogContentProps) {
    return (
        <div
            style={style}
            className={className ?? styles.dialogContent}
        >
            {children}
        </div>  
    )
};

//--------------------------------------------------------------------//

function DialogCloseButton({ className, style }: DialogButtonProps) {
    const context = useContext(DialogContext);
    if (!context) throw new Error("DialogCloseButton must be a child of DialogWrapper component");

    const { onClose } = context;

    function handleCloseDialog() {
        onClose();
    }

    return (
        <button 
            onClick={handleCloseDialog}
            style={style}
            className={className ?? styles.closeBtn}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={12} viewBox="0 0 384 512">{'<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->'}<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>
    )
};

export {
    Dialog,
    DialogContent,
    DialogCloseButton
}