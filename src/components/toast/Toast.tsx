import { createContext } from "react";
import type { ReactNode } from "react";
import styles from "./toast.module.css"

type ToastProps = {
    className?: string;
    children: ReactNode;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
}

const ToastContext = createContext<{
    something: string;
} | null>(null);

const positionStylesMap = {
    "top-left":      { top: "2rem", left: "2rem" },
    "top-right":     { top: "2rem", right: "2rem" },
    "bottom-left":   { bottom: "2rem", left: "2rem" },
    "bottom-right":  { bottom: "2rem", right: "2rem" },
    "top-center":    { top: "2rem", left: "50%", transform: "translateX(-50%)" },
    "bottom-center": { bottom: "2rem", left: "50%", transform: "translateX(-50%)" },
}

function Toast({ className, children, position }: ToastProps) {
    const something = ''

    return (
    <ToastContext.Provider value={{ something }}>
        <div 
            className={className ?? styles.toast} 
            style={positionStylesMap[position]}
        >
            {children}
        </div>
    </ToastContext.Provider>)
}

//--------------------------------------------------------------------//

type ToastItemProps = {
    className?: string;
    children: ReactNode
}

function ToastItem({ className, children } :ToastItemProps) {
    return <div className={className ?? styles.toastItem}>
        {children}
    </div>
}

//--------------------------------------------------------------------//

type ToastHeaderProps = {
    className?: string;
    children: ReactNode
}

function ToastHeader({ className, children } :ToastHeaderProps) {
    return <div className={className ?? styles.toastHeader}>
        {children}
    </div>
}

//--------------------------------------------------------------------//

function ToastBody() {

}

export {
    Toast,
    ToastItem,
    ToastHeader,
    ToastBody
};