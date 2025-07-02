
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./select.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type AccordionProps = {
    className?: string;
    children: ReactNode;
    id: string;
    label: string;
    defaultValue?: string | number;
    onChange: (value: string) => void;
}

const SelectContext = createContext<{
    listItems: (HTMLLIElement | HTMLDivElement)[];
    setListItems: React.Dispatch<React.SetStateAction<(HTMLLIElement | HTMLDivElement)[]>>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (value: string) => void;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    showList: boolean;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

function Select({ className, children, id, label, defaultValue, onChange }: AccordionProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showList, setShowList] = useState(false);
    const [selected, setSelected] = useState('');
    const [listItems, setListItems] = useState<(HTMLLIElement | HTMLDivElement)[]>([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);

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

            if (focusedEl && e.currentTarget.contains(focusedEl)) {
                return; // Still focused on dropdown child, do nothing
            }

            // Focus is outside list, close list
            setShowList(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // always check for open/close of list
        if (e.key === "Enter") setShowList(!showList);
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
                aria-label={`${label} dropdown menu`}
            >
                <label 
                    htmlFor={id} 
                    className={styles.selectLabel}
                >
                    {selected === '' ? label : selected}
                </label>
                <FontAwesomeIcon 
                    icon={faChevronDown}
                    width={15}
                />
                <input
                    ref={inputRef}
                    aria-hidden="true"
                    type="hidden"
                    id={id}
                    value={defaultValue}
                />

                <ul 
                    className={`${className ?? styles.selectList} ${showList ? styles.show : ""}`} 
                    role="combobox"
                >
                    {children}
                </ul>
            </div>
        </SelectContext.Provider>
    );
}

//--------------------------------------------------------------------//

type SelectItemProps = {
    className?: string;
    children: ReactNode;
    value: string | number;
}

function SelectItem({ className, children, value }: SelectItemProps) {
    const context = useContext(SelectContext);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            context?.setListItems(prev => {
                if (!ref.current) return prev
                return [...prev.filter((el) => el !== ref.current), ref.current]
            });
        }
    }, [ref]);

    const  handleSelectItem = (e:  React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => {
        if (!context || !context.inputRef.current) return
        
        // set value for the hidden input
        const targetValue = e.currentTarget.dataset.value;
        const targetText = e.currentTarget.innerText;
        if (!targetValue) return

        context.inputRef.current.value = targetValue;

        context.onChange(targetValue);
        context.setSelected(targetText);
        // Reset selected index to 0, focus dropdown
        context.setCurrentIndex(0);
        context.listItems[0].focus();
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
        >
            {children}
        </li>
    )
}

export {
    Select,
    SelectItem
};