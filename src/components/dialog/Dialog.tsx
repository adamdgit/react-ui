import { useRef } from "react";
import type { DialogProps, DialogWrapperProps } from "../../types";
import styles from "./dialog.module.css"

function Dialog({ className, children, style, showDialog, onClose }: DialogProps) {
    const ref = useRef<HTMLDivElement>(null);

    function handleOnBlur(e: React.MouseEvent<HTMLDivElement>) {
        // Because dialog component uses inset 0 it fills the entire page
        // hide if target is dialog, else target is child, don't hide
        if (e.target === ref.current) {
            onClose();
        }
    }
    
    if (showDialog) {
        return (
            <div
                ref={ref}
                style={style}
                className={className ?? styles.dialog} 
                onClick={handleOnBlur}
            >
                <DialogWrapper>
                    {children}
                </DialogWrapper>
            </div>
        )
    }
}

function DialogWrapper({ children }: DialogWrapperProps) {
    return (
        <div 
            className={styles.dialogWrapper}
        >
            {children}
        </div>
    )
}

export {
    Dialog,
    DialogWrapper
}