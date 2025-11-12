import { useEffect, useRef, useState } from "react";
import styles from "./rating.module.css";
import type { RatingProps, RatingSelectedData } from "../../types";
import { convertThemeToCSSVars } from "../../utils/convertCSSVars";

//--------------------------------------------------------------------//

function Rating({ className, style, onChange, allowHalfRatings, data, textPosition, iconFull, iconEmpty, themeOverride }: RatingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const ratingsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<RatingSelectedData>({
        rating: null, index: null
    });
    const [textStyles, setTextStyles] = useState<React.CSSProperties>({});

    // If user provides a theme override, updte the components theme variables
    const CSSVariables = themeOverride ? convertThemeToCSSVars(themeOverride) : {};
    const ratings = Array.from({ length: data.length }, (_, i) => i+1);
    const ratingText = hoverIndex !== null
        ? data.find(x => x.value === hoverIndex + 1)?.name
        : data.find(x => x.value === selectedRating.rating)?.name;

    // Position rating text based on user props
    useEffect(() => {
        if (!ref.current) return;

        const offsets = {
            top:    { top: `-30px`,     left: '50%',    transform: 'translateX(-50%)', bottom: 'unset' },
            bottom: { bottom: `-30px`,  left: '50%',    transform: 'translateX(-50%)', top: 'unset'},
        } as const;

        setTextStyles(offsets[textPosition]);
    },[textPosition]);

    function handleSelectRating(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) {
        const targetValue = Number(e.currentTarget.value ?? 0);
        const targetIndex = ratingsRef.current.findIndex(el => el === e.currentTarget);

        onChange(targetValue);
        setSelectedRating({ rating: targetValue, index: targetIndex });
        highlightRating(targetIndex);
    };

    // find current hovered index and highlight all ratings up to hovered
    function handleHoverRating(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) {
        const targetIndex = ratingsRef.current.findIndex(el => el === e.currentTarget);

        highlightRating(targetIndex);
    };

    function handleRemoveHover() {
        setHoverIndex(null);

        // keep existing highlights if a selection is made
        if (selectedRating.index !== null) {
            highlightRating(selectedRating.index);
            return
        }

        ratingsRef.current.map(el => el ? el.style.color = '' : '');
    };

    // highlight ratings up to what the user is hovered over/selected
    function highlightRating(targetIndex: number) {
        setHoverIndex(targetIndex);

        ratingsRef.current.map((el, i) => {
            if (el) {
                if (i > targetIndex) {
                    el.style.color = '';
                }
                else {
                    el.style.color = '#f7a335ff';
                }
            }
        });
    };

    function handleKeyboard(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
        if (e.key === "ArrowRight") {
            const next = Math.min(i + 1, ratings.length - 1);
            ratingsRef.current[next]?.focus();
            setSelectedRating({ rating: ratings[next], index: next });
        }

        if (e.key === "ArrowLeft") {
            const prev = Math.max(i - 1, 0);
            ratingsRef.current[prev]?.focus();
            setSelectedRating({ rating: ratings[prev], index: prev });
        }

        if (e.key === "Enter" || e.key === " ") {
            setSelectedRating({ rating: ratings[i], index: i });
            onChange(ratings[i]);
            highlightRating(ratings[i]);
        }
    }

    return (
        <div
            ref={ref}
            role="radiogroup"
            aria-label="Rating"
            style={{...style, ...CSSVariables}}
            className={className ?? styles.rating}
        >
            <span className={styles.ratingText} style={textStyles} aria-label="Selected Rating">
                {ratingText}
            </span>

            {ratings.map((r, i) => {
                const isHovered = 
                    (hoverIndex !== null && i <= hoverIndex) ||
                    (hoverIndex === null && selectedRating.index !== null && i <= selectedRating.index);
                    
                return <button
                    key={r}
                    ref={el => { ratingsRef.current[i] = el }}
                    role="radio"
                    aria-checked={selectedRating.rating === r}
                    style={style}
                    className={styles.ratingItem}
                    onClick={handleSelectRating}
                    onPointerEnter={handleHoverRating}
                    onPointerLeave={handleRemoveHover}
                    onKeyDown={e => handleKeyboard(e, i)}
                    value={r}
                >
                    {isHovered ? iconFull : iconEmpty}
                </button>
            })}
        </div>
    )
};

export {
    Rating,
}