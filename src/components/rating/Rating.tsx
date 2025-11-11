import { useRef, useState } from "react";
import styles from "./rating.module.css";
import type { RatingProps } from "../../types";
import { convertThemeToCSSVars } from "../../utils/convertCSSVars";

//--------------------------------------------------------------------//

function Rating({ className, style, onChange, allowHalfRatings, maxRating, icon, themeOverride }: RatingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const ratingsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [selectedRating, setSelectedRating] = useState<null | number>(null);

    // If user provides a theme override, updte the components theme variables
    const CSSVariables = themeOverride ? convertThemeToCSSVars(themeOverride) : {};
    const ratings = Array.from({ length: maxRating }, (_, i) => i+1);

    function handleSelectRating(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) {
        const targetValue = Number(e.currentTarget.value ?? 0);
        onChange(targetValue);
        setSelectedRating(targetValue)
        highlightRating(targetValue);
    };

    // find current hovered index and highlight all ratings up to hovered
    function handleHoverRating(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) {
        const targetValue = Number(e.currentTarget.value ?? 0);
        highlightRating(targetValue);
    };

    function handleRemoveHover() {
        // don't reset all highlights on pointer leave if user has made a selection
        if (selectedRating) {
            highlightRating(selectedRating); // convert to index
            return
        }
        ratingsRef.current.map(el => {
            if (el) el.style.color = '';
        });
    };

    function highlightRating(targetValue: number) {
        ratingsRef.current.map((el, i) => {
            if (el) {
                if (i > targetValue -1) {// must convert to index eg star 5 is idx 4
                    el.style.color = '';
                }
                else {
                    el.style.color = '#f7a335ff';
                }
            }
        });
    };

    return (
        <div
            ref={ref}
            style={{...style, ...CSSVariables}}
            className={className ?? styles.rating}
        >
            {ratings.map((r, i) => 
                <button
                    ref={el => {ratingsRef.current[i] = el}}
                    style={style}
                    className={className ?? styles.ratingItem}
                    onClick={handleSelectRating}
                    onPointerEnter={handleHoverRating}
                    onPointerLeave={handleRemoveHover}
                    value={r}
                >
                    {icon}
                </button>
            )}
        </div>
    )
};

export {
    Rating,
}