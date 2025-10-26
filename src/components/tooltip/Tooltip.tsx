import { useContext, useEffect, useRef } from "react";
import styles from "./tooltip.module.css"
import type { 
    TooltipPopupProps, 
    TooltipProps 
} from "../../types";
import { TooltipContext } from "../../context";

//--------------------------------------------------------------------//

function Tooltip({ className, children, style }: TooltipProps) {
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

function TooltipPopup({ className, style, content, position, marginOffset }: TooltipPopupProps) {
    const context = useContext(TooltipContext);
    if (!context) throw new Error("TooltipPopup must be a child of Tooltip")

    const { ref, elementSize } = context;

    useEffect(() => {
        const cssTriangleHeight = 8;
        const height = elementSize.height + cssTriangleHeight - (marginOffset ?? 0);

        if (position === "top-center") 
            ref.current?.style.setProperty('--bottom', `${height}px`);

        if (position === "bottom-center") 
            ref.current?.style.setProperty('--top', `${height}px`);
    },[]);

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
    Tooltip,
    TooltipPopup
};