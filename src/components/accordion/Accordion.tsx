import { useContext, useEffect, useRef, useState } from "react"
import styles from "./accordion.module.css"
import type { 
    AccordionBodyProps,
    AccordionHeaderProps,
    AccordionItemProps, AccordionProps 
} from "../../types";
import { AccordionContext, AccordionItemContext } from "../../context";
import { convertThemeToCSSVars } from "../../utils/convertCSSVars";

function Accordion({ className, children, mode, style, themeOverride }: AccordionProps) {
    const [headers, setHeaders] = useState<HTMLButtonElement[]>([]);
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    // If user provides a theme override, updte the components theme variables
    const CSSVariables = themeOverride ? convertThemeToCSSVars(themeOverride) : {};

    return (
        <AccordionContext.Provider value={{ headers, setHeaders, mode, openItemId, setOpenItemId }}>
            <div 
                style={{...style, ...CSSVariables}}
                className={className ?? styles.accordion} 
                role="presentation"
            >
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

//--------------------------------------------------------------------//

function AccordionItem({ className, children, style }: AccordionItemProps) {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionItem must be a child of Accordion")

    const { mode, openItemId, setOpenItemId } = context;
    const [id] = useState(crypto.randomUUID());
    const [isOpen, setIsOpen] = useState(false);

    // Keep track of open item when in 'single' mode only
    const toggle = () => {
        if (mode === 'single') {
            setOpenItemId(isOpen ? null : id)
        }
        setIsOpen(!isOpen);
    };

    // Only allow one accordion item to be open when in 'single' mode
    useEffect(() => {
        if (mode === 'single' && openItemId !== id) {
            setIsOpen(false);
        }
    },[openItemId, id, mode])

    return (
        <AccordionItemContext.Provider value={{ isOpen, toggle, id }}>
            <div 
                style={style}
                className={className ?? styles.accordionItem}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
}

//--------------------------------------------------------------------//

function AccordionHeader({ className, children, style }: AccordionHeaderProps) {
    const context = useContext(AccordionItemContext);
    const accordionContext = useContext(AccordionContext);
    if (!context || !accordionContext) {
        throw new Error("AccordionHeader must be a child of an AccordionItem");
    }

    const { id, isOpen, toggle} = context;
    const ref = useRef<HTMLButtonElement>(null);

    // Save references to accordion header items
    useEffect(() => {
        if (ref.current) {
            accordionContext.setHeaders(prev => {
                if (!ref.current) return prev
                return [...prev.filter((el) => el !== ref.current), ref.current]
            });
        }
    }, [ref]);

    // TODO?: Think about saving open item IDS when in multiple mode as well.
    const handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const { headers } = accordionContext;
        const currentIndex = headers.indexOf(ref.current!);

        switch (e.key) {
            case "ArrowDown": 
                headers[(currentIndex + 1) % headers.length]?.focus();
                break;

            case "ArrowUp":
                headers[(currentIndex - 1 + headers.length) % headers.length]?.focus();
                break;

            case "Home":
                headers[0]?.focus();
                break;

            case "End":
                headers[headers.length - 1]?.focus();
                break;
        }
    }

  return (
    <button
        ref={ref}
        id={id}
        onClick={toggle}
        onKeyDown={handleKeyPress}
        className={className ?? styles.accordionHeader}
        style={style}
        aria-expanded={isOpen}
        aria-label="Accordion Header"
    >
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.headerIcon} ${isOpen ? styles.rotate : ''}`} fill="currentColor" width={12} viewBox="0 0 512 512">{`<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->`}<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
    </button>
  );
}

//--------------------------------------------------------------------//

function AccordionBody({ className, children, style }: AccordionBodyProps) {
    const context = useContext(AccordionItemContext);
    if (!context) throw new Error("AccordionBody must be a child of an AccordionItem");

    const { id, isOpen } = context;

    return (
        <div 
            style={style}
            className={`${className ?? styles.accordionBody} ${isOpen ? styles.show : ''}`}
            role="region"
            aria-labelledby={id}
            aria-hidden={!isOpen}
        >
            <div className={styles.accordionBodyText}>
                {children}
            </div>
        </div>
    );
}

export {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody
};