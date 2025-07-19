import { useContext, useEffect, useState } from "react";
import styles from "./toast.module.css"
import type { ToastContentProps, ToastProps } from "../../types";
import { ToastContext } from "../../context";

const positionStylesMap = {
    "none":          {},
    "top-left":      { top: "2rem", left: "2rem" },
    "top-right":     { top: "2rem", right: "2rem" },
    "bottom-left":   { bottom: "2rem", left: "2rem" },
    "bottom-right":  { bottom: "2rem", right: "2rem" },
    "top-center":    { top: "2rem", left: "50%", transform: "translateX(-50%)" },
    "bottom-center": { bottom: "2rem", left: "50%", transform: "translateX(-50%)" },
}

function Toast({ className, style, children, position, timeoutDuration, showToast, progressBar, onClose }: ToastProps) { 
    // add position styles to the provided styles
    const styleOverride: React.CSSProperties = {
        ...style,
        ...positionStylesMap[position],
    };
    
    if (showToast) {
        return (
            <ToastContext.Provider value={{ showToast, timeoutDuration, progressBar, onClose }}>
                <div 
                    className={`${className ?? styles.toast} ${showToast ? styles.show : ''}`} 
                    style={styleOverride}
                    role="status"
                    aria-atomic="true"
                >
                    {children}
                </div>
            </ToastContext.Provider>
        )
    }
}

//--------------------------------------------------------------------//

function ToastContent({ className, children }: ToastContentProps) {
    const context = useContext(ToastContext);
    if (!context) throw new Error("Missing context provider");

    const { onClose } = context;
    
    return (
        <div className={className ?? styles.toastItem}>
            <button 
                className={styles.toastClose}
                onClick={onClose}
                aria-label="Close notification"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={12} viewBox="0 0 384 512">{'<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->'}<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </button>
            {children}
            <ProgressBar />
        </div>
    )
}

//--------------------------------------------------------------------//

function ProgressBar() {
    const context = useContext(ToastContext);
    if (!context) throw new Error("Missing context provider");

    const { showToast, timeoutDuration, progressBar, onClose } = context;
    const [percent, setPercent] = useState(100);
    const INTERVAL = 50;

    useEffect(() => {
        // if parent ever updates the show to false, we reset the percentage
        if (!showToast) {
            setTimeout(() => {
                setPercent(100);
            }, 150);
            return
        }

        // work out the interval to update the progress bar, based on 100% - 0% and duration
        const updateInterval = 100 / (timeoutDuration / INTERVAL);

        // Reduce percentage based on timeoutDuration
        const timer = setInterval(() => {
            setPercent(prev => prev -= updateInterval);
        }, INTERVAL);

        return () => clearInterval(timer)
    },[showToast])

    useEffect(() => {
        if (percent <= 0) {
            onClose();
        }
    }, [percent]);

    if (progressBar) {
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
    ToastContent,
};