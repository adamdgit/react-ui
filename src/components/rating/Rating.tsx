import { useContext, useEffect, useRef, useState } from "react";
import styles from "./rating.module.css";
import type { RatingItemProps, RatingProps } from "../../types";
import { RatingContext } from "../../context";
import { convertThemeToCSSVars } from "../../utils/convertCSSVars";

//--------------------------------------------------------------------//

function Rating({ className, style, children, onChange, themeOverride }: RatingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [ratingsList, setRatingsList] = useState<HTMLButtonElement[]>([]);
    const [selectedRating, setSelectedRating] = useState<null | number>(null);
    
    // If user provides a theme override, updte the components theme variables
    const CSSVariables = themeOverride ? convertThemeToCSSVars(themeOverride) : {};

    return (
        <RatingContext.Provider value={{ onChange, ratingsList, setRatingsList, selectedRating, setSelectedRating }}>
            <div
                ref={ref}
                style={{...style, ...CSSVariables}}
                className={className ?? styles.rating}
            >
                {children}
            </div>
        </RatingContext.Provider>
    )
};

//--------------------------------------------------------------------//

function RatingItem({ className, style, value, icon }: RatingItemProps) {
    const context = useContext(RatingContext);
    if (!context) throw new Error("RatingItem must be a child of Rating");

    const { onChange, ratingsList, setRatingsList, selectedRating, setSelectedRating } = context;
    const ref = useRef<HTMLButtonElement>(null);

    function handleSelectRating(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) {
        const targetValue = Number(e.currentTarget.value ?? 0);
        const targetIdx = targetValue -1;
        onChange(targetValue);
        setSelectedRating(targetIdx);

        highlightRating(targetIdx);
    };

    // find current hovered index and highlight all ratings up to hovered
    function handleHoverRating() {
        if (!ref.current) return
        const hoveredIdx = ratingsList.indexOf(ref.current);

        highlightRating(hoveredIdx);
    };

    function handleRemoveHover() {
        // don't reset all highlights on pointer leave if user has made a selection
        if (selectedRating) {
            highlightRating(selectedRating); // convert to index
            return
        }
        ratingsList.map(el => el.style.color = '');
    };

    function highlightRating(targetIndex: number) {
        ratingsList.map((el, idx) => {
            if (idx > targetIndex)
                el.style.color = '';
            else
                el.style.color = '#f7a335ff';
        });
    };

    useEffect(() => {
        if (ref.current) {
            // keep track of each rating item in a list
            setRatingsList(prev => {
                if (!ref.current) return prev
                return [...prev.filter((el) => el !== ref.current), ref.current]
            });
        }
    },[ref]);

    return (
        <button
            ref={ref}
            style={style}
            className={className ?? styles.ratingItem}
            onClick={handleSelectRating}
            onPointerEnter={handleHoverRating}
            onPointerLeave={handleRemoveHover}
            value={value}
        >
            {icon}
        </button>
    )
}

export {
    Rating,
    RatingItem
}