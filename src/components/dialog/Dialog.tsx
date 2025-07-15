import { useState } from "react";
import type { DialogProps } from "../../types";
import styles from "./dialog.module.css"

function Dialog({ className, children, style, showDialog }: DialogProps) {
    const [show, setShow] = useState(showDialog);

    if (show) {
        return (
            <div
                style={style}
                className={className ?? styles.dialog} 
            >
                <button onClick={() => setShow(false)}>x</button>
                {children}
            </div>
        )
    }
}

export {
    Dialog,
}