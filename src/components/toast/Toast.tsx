import { createContext, useContext, useEffect, useState } from "react";
import styles from "./toast.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import type { ToastItemProps, ToastProps } from "../../types";

const ToastContext = createContext<{
    durationMS: number;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
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

function Toast({ className, style, children, position, durationMS, showToast, progressBar }: ToastProps) {
    const [show, setShow] = useState(showToast);
    
    // add position styles to the provided styles
    const styleOverride: React.CSSProperties = {
        ...style,
        ...positionStylesMap[position],
    };

    useEffect(() => {
        setShow(showToast);
    },[showToast])
    
    return (
        <ToastContext.Provider value={{ durationMS, show, setShow, progressBar }}>
            <div 
                className={`${className ?? styles.toast} ${show ? styles.show : ''}`} 
                style={styleOverride}
                role="status"
                aria-atomic="true"
            >
                {children}
            </div>
        </ToastContext.Provider>
    )
}

//--------------------------------------------------------------------//

function ToastItem({ className, children }: ToastItemProps) {
    const context = useContext(ToastContext);

    return (
        <div className={className ?? styles.toastItem}>
            <button 
                className={styles.toastClose}
                onClick={() => context?.setShow(false)}
                aria-label="Close notification"
            >
                <FontAwesomeIcon icon={faXmark} width={18} />
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

        // if parent ever updates the show to false, we reset the percentage
        if (!context.show) {
            setTimeout(() => {
                setPercent(100);
            }, 150);
            return
        }

        // work out the interval to update the progress bar, based on 100% - 0% and duration
        const updateInterval = 100 / (context?.durationMS / INTERVAL);

        // Reduce percentage based on durationMS
        const timer = setInterval(() => {
            setPercent(prev => prev -= updateInterval);
        }, INTERVAL);

        return () => clearInterval(timer)
    },[context])

    useEffect(() => {
        if (percent <= 0) {
            context?.setShow(false);
        }
    }, [percent, context]);

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