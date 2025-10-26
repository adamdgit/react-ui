import { useContext, useEffect, useRef, useState } from "react";
import styles from "./select.module.css"
import type { SelectItemProps, SelectListProps, SelectProps } from "../../types";
import { SelectContext } from "../../context";

//--------------------------------------------------------------------//

function Select({ value, label, classMap, children, id, onChange, ...props }: SelectProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showList, setShowList] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const [listItems, setListItems] = useState<(HTMLLIElement | HTMLDivElement)[]>([]);
    const [internalVal, setInternalVal] = useState<string | number>(value ?? "");
    const isControlled = value !== undefined;

    // save reference to each list item in the select dropdown
    useEffect(() => {
        if (ref.current) {
            setListItems(prev => {
                if (!ref.current) return prev
                return [ref.current, ...prev.filter((el) => el !== ref.current)]
            });
        }
    }, [ref]);

    const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (showList) {
            const focusedEl = e.relatedTarget as HTMLElement | null;

            // Child is focused, don't hide dropdown
            if (focusedEl && e.currentTarget.contains(focusedEl)) return

            setShowList(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") setShowList(!showList); // toggle show
        if (e.key === "Escape") setShowList(false);

        // Only update selections using keys if list is open
        if (showList) {
            switch (e.key) {
                case "ArrowDown": 
                    listItems[(currentIndex + 1) % listItems.length]?.focus();
                    setCurrentIndex(prev => (prev + 1) % listItems.length);
                    break;

                case "ArrowUp":
                    listItems[(currentIndex - 1 + listItems.length) % listItems.length]?.focus();
                    setCurrentIndex(prev => (prev - 1 + listItems.length) % listItems.length);
                    break;

                case "Home":
                    listItems[0]?.focus();
                    setCurrentIndex(0);
                    break;

                case "End":
                    listItems[listItems.length - 1]?.focus();
                    setCurrentIndex(listItems.length - 1);
                    break;
            }
        }
    };

    return (
        <SelectContext.Provider value={{ 
            id, listItems, setListItems, inputRef, onChange, showList, setCurrentIndex, isControlled, setInternalVal
        }}>
            <div 
                {...props}
                ref={ref}
                className={classMap?.selectInput ?? styles.selectWrap}
                onClick={() => setShowList(!showList)}
                tabIndex={0}
                onKeyDown={handleKeyPress}
                onBlur={handleOnBlur}
                role="combobox"
                aria-haspopup="listbox"
                aria-labelledby={`${id}-label`}
                aria-controls={`${id}-dropdown`}
            >
                <label 
                    id={`${id}-label`}
                    htmlFor={id} 
                    className={styles.selectLabel}
                >
                    {value ? value : internalVal ? internalVal : label}
                </label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={12} viewBox="0 0 512 512">{`<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->`}<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                <input
                    ref={inputRef}
                    aria-hidden="true"
                    type="hidden"
                    id={id}
                    value={value ?? internalVal}
                />
                {children}
            </div>
        </SelectContext.Provider>
    );
}

//--------------------------------------------------------------------//

function SelectList({ children, className, style, ...props}: SelectListProps) {
    const context = useContext(SelectContext);
    if (!context) throw new Error("SelectList must be a child of Select");

    const { id, showList } = context;

    return (
        <ul 
            {...props}
            id={`${id}-dropdown`}
            style={style}
            className={`${className ?? styles.selectList} ${showList ? styles.show : ""}`} 
            role="listbox"
        >
            {children}
        </ul>
    )
}

//--------------------------------------------------------------------//

function SelectItem({ className, children, value, ...props }: SelectItemProps) {
    const context = useContext(SelectContext);
    if (!context) throw new Error("SelectItem must be a child of SelectList")

    const { 
        listItems, setListItems, setCurrentIndex, inputRef, onChange, isControlled, setInternalVal
    } = context;
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            setListItems(prev => {
                if (!ref.current) return prev
                return [...prev.filter((el) => el !== ref.current), ref.current]
            });
        }
    }, [ref]);

    const handleSelectItem = (e:  React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => {
        if (!inputRef.current) return
        
        // set value for the hidden input
        const targetValue = e.currentTarget.dataset.value ?? '';
        inputRef.current.value = targetValue;

        onChange(targetValue);

        if (!isControlled) {
            setInternalVal(targetValue);
        }
        // Reset selected index to 0, focus dropdown
        setCurrentIndex(0);
        listItems[0].focus();
    }
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>) => {
        if (e.key === "Enter") handleSelectItem(e);
    }

    return (
        <li 
            {...props}
            ref={ref}
            className={className ?? styles.selectItem}
            data-value={value}
            onClick={handleSelectItem}
            onKeyDown={handleKeyPress}
            tabIndex={context?.showList ? 0 : undefined}
            role="option"
        >
            {children}
        </li>
    )
}

export {
    Select,
    SelectList,
    SelectItem
};