import { useContext, useEffect, useRef, useState } from "react";
import styles from "./select.module.css"
import type { SelectItemProps, SelectProps } from "../../types";
import { SelectContext } from "../../context";

function Select({ className, children, id, label, defaultValue, onChange }: SelectProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showList, setShowList] = useState(false);
    const [selected, setSelected] = useState('');
    const [listItems, setListItems] = useState<(HTMLLIElement | HTMLDivElement)[]>([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);

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
    }

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
    }

    return (
        <SelectContext.Provider value={{ 
            listItems, setListItems, inputRef, onChange, setSelected, showList, setCurrentIndex
        }}>
            <div 
                ref={ref}
                className={styles.selectWrap}
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
                    {selected === '' ? label : selected}
                </label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={12} viewBox="0 0 512 512">{`<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->`}<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                <input
                    ref={inputRef}
                    aria-hidden="true"
                    type="hidden"
                    id={id}
                    value={defaultValue}
                />

                <ul 
                    id={`${id}-dropdown`}
                    className={`${className ?? styles.selectList} ${showList ? styles.show : ""}`} 
                    role="listbox"
                >
                    {children}
                </ul>
            </div>
        </SelectContext.Provider>
    );
}

//--------------------------------------------------------------------//

function SelectItem({ className, children, value }: SelectItemProps) {
    const context = useContext(SelectContext);
    if (!context) throw new Error("Missing context provider")

    const { 
        setSelected, setCurrentIndex, listItems, setListItems, inputRef, onChange 
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

    const  handleSelectItem = (e:  React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => {
        if (!inputRef.current) return
        
        // set value for the hidden input
        const targetValue = e.currentTarget.dataset.value ?? '';
        const targetText = e.currentTarget.innerText;

        inputRef.current.value = targetValue;

        onChange(targetValue);
        setSelected(targetText);
        // Reset selected index to 0, focus dropdown
        setCurrentIndex(0);
        listItems[0].focus();
    }
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>) => {
        if (e.key === "Enter") handleSelectItem(e);
    }

    return (
        <li 
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
    SelectItem
};