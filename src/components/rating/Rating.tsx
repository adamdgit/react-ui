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

    // highlight ratings up to what the user is hovered over/selected
    function highlightRating(targetValue: number) {
        ratingsRef.current.map((el, i) => {
            if (el) {
                if (i > targetValue -1) {
                    el.style.color = '';
                }
                else {
                    el.style.color = '#f7a335ff';
                }
            }
        });
    };

    const handleKeyboard = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
        if (e.key === "ArrowRight") {
            const next = Math.min(i + 1, ratings.length - 1);
            ratingsRef.current[next]?.focus();
            setSelectedRating(ratings[next]);
        }

        if (e.key === "ArrowLeft") {
            const prev = Math.max(i - 1, 0);
            ratingsRef.current[prev]?.focus();
            setSelectedRating(ratings[prev]);
        }

        if (e.key === "Enter" || e.key === " ") {
            setSelectedRating(ratings[i]);
        }
    };

    return (
        <div
            ref={ref}
            role="radiogroup"
            aria-label="Rating"
            style={{...style, ...CSSVariables}}
            className={className ?? styles.rating}
        >
            <span>rating name</span>
            {ratings.map((r, i) => 
                <button
                    ref={el => { ratingsRef.current[i] = el }}
                    role="radio"
                    aria-checked={selectedRating === r}
                    style={style}
                    className={className ?? styles.ratingItem}
                    onClick={handleSelectRating}
                    onPointerEnter={handleHoverRating}
                    onPointerLeave={handleRemoveHover}
                    onKeyDown={e => handleKeyboard(e, i)}
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