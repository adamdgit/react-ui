import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import styles from "./toast.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type ToastProps = {
    className?: string;
    children: ReactNode;
    position: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
    durationMS: number; // Milliseconds
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    progressBar: boolean; // show progress bar?
}

const ToastContext = createContext<{
    durationMS: number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    progressBar: boolean;
} | null>(null);

const positionStylesMap = {
    "none":          {},
    "top-left":      { top: "2rem", left: "2rem" },
    "top-right":     { top: "2rem", right: "2rem" },
    "bottom-left":   { bottom: "2rem", left: "2rem" },
    "bottom-right":  { bottom: "2rem", right: "2rem" },
    "top-center":    { top: "2rem", left: "50%", transform: "translateX(-50%)" },
    "bottom-center": { bottom: "2rem", left: "50%", transform: "translateX(-50%)" },
}

function Toast({ className, children, position, durationMS, isOpen, setIsOpen, progressBar }: ToastProps) {
    return (
        <ToastContext.Provider value={{ durationMS, isOpen, setIsOpen, progressBar }}>
            <div 
                className={`${className ?? styles.toast} ${isOpen ? styles.show : ''}`} 
                style={positionStylesMap[position]}
                role="status"
                aria-atomic="true"
            >
                {children}
            </div>
        </ToastContext.Provider>
    )
}

//--------------------------------------------------------------------//

type ToastItemProps = {
    className?: string;
    children: ReactNode
}

function ToastItem({ className, children } :ToastItemProps) {
    const context = useContext(ToastContext);

    return (
        <div className={className ?? styles.toastItem}>
            <button 
                className={styles.toastClose}
                onClick={() => context?.setIsOpen(false)}
                aria-label="Close notification"
            >
                <FontAwesomeIcon icon={faXmark} height={18} width={18} />
            </button>
            {children}
            <ProgressBar />
        </div>
    )
}

//--------------------------------------------------------------------//

function ProgressBar() {
    const context = useContext(ToastContext);
    const [percent, setPercent] = useState(100);
    const INTERVAL = 50;

    useEffect(() => {
        if (!context) return

        // work out the interval to update the progress bar, based on 100% - 0% and duration
        const updateInterval = 100 / (context?.durationMS / INTERVAL);

        // Every 100ms reduce percentage based on duration
        const timer = setInterval(() => {
            setPercent(prev => prev -= updateInterval);
        }, INTERVAL);

        return () => clearInterval(timer)
    },[context])

    useEffect(() => {
        if (percent <= 0) {
            context?.setIsOpen(false);
        }
    }, [percent, context]);

    // Only show visual progress bar if true
    if (context?.progressBar) {
        return (
            <div 
                className={styles.toastProgress} 
                style={{width: `${percent}%`}}
            >
            </div>
        ) 
    }
}


export {
    Toast,
    ToastItem,
};