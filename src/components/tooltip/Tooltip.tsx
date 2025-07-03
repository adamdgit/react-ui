import { createContext, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./tooltip.module.css"

type TooltipProps = {
    className?: string;
    children: ReactNode;
    style?: React.CSSProperties;
}

const TooltipContext = createContext<{
    elementSize: { width: number, height: number };
    ref: React.RefObject<HTMLDivElement | null>
} | null>(null);

function TooltipWrap({ className, children, style }: TooltipProps) {
    const elementSize = { width: 0, height: 0 };
    const ref = useRef<HTMLDivElement | null>(null);

    // get the wrapper height and width so we can position the popup correctly
    useEffect(() => {
        if (!ref) return 

        elementSize.width = ref.current?.clientWidth ?? 0
        elementSize.height = ref.current?.clientHeight ?? 0
    },[])

    return (
        <TooltipContext.Provider value={{ elementSize, ref }}>
            <div 
                style={style}
                ref={ref}
                className={className ?? styles.tooltip} 
                role="status"
                aria-atomic="true"
            >
                {children}
            </div>
        </TooltipContext.Provider>
    )
}

//--------------------------------------------------------------------//

type TooltipPopupProps = {
    className?: string;
    style?: React.CSSProperties;
    content: string;
    position: "top-center" | "bottom-center";
    marginOffset?: number; // margin on element ruins absolute position
}

function TooltipPopup({ className, style, content, position, marginOffset }: TooltipPopupProps) {
    const context = useContext(TooltipContext);

    useEffect(() => {
        if (!context) return 

        // 8px for height of the css triangle
        const height = context.elementSize.height + 8 - (marginOffset ?? 0);

        if (position === "top-center") {
            context?.ref.current?.style
                .setProperty('--bottom', `${height}px`);
        }
        if (position === "bottom-center") {
            context?.ref.current?.style
                .setProperty('--top', `${height}px`);
        }
    },[])

    return (
        <div 
            style={style}
            className={className ??
                `${styles.tooltipPopup} ${position === "bottom-center" ? styles.popupBottom : styles.popupTop}`
            }
        >
            <div
                className={position === "bottom-center" ? styles.arrowUp : styles.arrowDown}
            ></div>
            {content}
        </div>
    )
}

export {
    TooltipWrap,
    TooltipPopup
};