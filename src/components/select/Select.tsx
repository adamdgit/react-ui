
import { createContext, useContext, useRef, type ReactNode } from "react";
import styles from "./select.module.css"

type AccordionProps = {
    className?: string;
    children: ReactNode;
    id: string;
    label: string;
    defaultValue: string | number;
    onChange: (value: string) => void;
}

const SelectContext = createContext<{
    inputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (value: string) => void;
} | null>(null);

function Select({ className, children, id, label, defaultValue, onChange }: AccordionProps) {
    const inputRef = useRef<HTMLInputElement | null>(null)    

    return (
        <SelectContext.Provider value={{ inputRef, onChange }}>
            <div className={styles.selectWrap}>
                <label htmlFor={id} className={styles.selectLabel}>{label}</label>
                <input
                    ref={inputRef}
                    aria-hidden="true"
                    type="hidden"
                    id={id}
                    value={defaultValue}
                />
                <ul 
                    className={className ?? styles.selectList} 
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

    function handleSelectItem(e:  React.MouseEvent<HTMLLIElement>) {
        if (!context || !context.inputRef.current) return
        
        // set value for the hidden input
        const targetValue = e.currentTarget.dataset.value;
        if (!targetValue) return

        context.inputRef.current.value = targetValue;

        context.onChange(targetValue);
    }

    return (
        <li 
            className={className ?? styles.selectItem}
            data-value={value}
            onClick={handleSelectItem}
        >
            {children}
        </li>
    )
}

export {
    Select,
    SelectItem
};