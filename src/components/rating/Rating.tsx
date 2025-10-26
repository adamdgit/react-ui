import { useContext, useEffect, useRef, useState } from "react";
import styles from "./rating.module.css";
import type { RatingItemProps, RatingProps } from "../../types";
import { RatingContext } from "../../context";

//--------------------------------------------------------------------//

function Rating({ className, style, children, onChange }: RatingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [ratingsList, setRatingsList] = useState<HTMLButtonElement[]>([]);
    
    return (
        <RatingContext.Provider value={{ onChange, ratingsList, setRatingsList }}>
            <div
                ref={ref}
                style={style}
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

    const { onChange, ratingsList, setRatingsList } = context;
    const ref = useRef<HTMLButtonElement>(null);

    function handleSelectRating(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) {
        const targetValue = Number(e.currentTarget.value ?? 0);
        onChange(targetValue);
    };

    // find current hovered index and highlight all ratings up to hovered
    function handleHoverRating() {
        if (!ref.current) return
        const currentHoveredIdx = ratingsList.indexOf(ref.current);

        ratingsList.map((el, idx) => {
            if (idx > currentHoveredIdx) return
            el.style.color = '#f7a335ff';
        });
    };

    function handleRemoveHover() {
        ratingsList.map(el => el.style.color = '');
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