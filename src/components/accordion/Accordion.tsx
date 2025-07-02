import { 
    createContext, 
    useContext, 
    useEffect, 
    useRef, 
    useState
} from "react"
import type { ReactNode } from "react";
import styles from "./accordion.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type AccordionProps = {
    className?: string;
    children: ReactNode;
    mode: "multiple" | "single"; // All accordion items can be expanded or only 1
}

const AccordionContext = createContext<{
    headers: HTMLButtonElement[];
    setHeaders: React.Dispatch<React.SetStateAction<HTMLButtonElement[]>>;
    mode: "multiple" | "single";
    openItemId: string | null;
    setOpenItemId: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

function Accordion({ className, children, mode }: AccordionProps) {
    const [headers, setHeaders] = useState<HTMLButtonElement[]>([]);
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    return (
        <AccordionContext.Provider value={{ headers, setHeaders, mode, openItemId, setOpenItemId }}>
            <div 
                className={className ?? styles.accordion} 
                role="presentation"
            >
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

//--------------------------------------------------------------------//

type AccordionItemProps = {
    className?: string;
    children: ReactNode;
};

const AccordionItemContext = createContext<{
    isOpen: boolean;
    toggle: () => void;
    id: string
} | null>(null);

function AccordionItem({ className, children }: AccordionItemProps) {
    const context = useContext(AccordionContext)
    if (!context) throw new Error("AccordionItem must be a child of Accordion");

    const [id] = useState(crypto.randomUUID());
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        if (context.mode === 'single') {
            context.setOpenItemId(isOpen ? null : id)
        }
        setIsOpen(!isOpen);
    };

    // Only close not selected items if in single mode
    useEffect(() => {
        if (context.mode === 'single' && context.openItemId !== id) {
            setIsOpen(false);
        }
    },[context.openItemId, id, context.mode])

    return (
        <AccordionItemContext.Provider value={{ isOpen, toggle, id }}>
            <div className={className ?? styles.accordionItem}>
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
}

//--------------------------------------------------------------------//

type AccordionHeaderProps = {
    className? : string;
    children: ReactNode;
};

function AccordionHeader({ className, children }: AccordionHeaderProps) {
    const context = useContext(AccordionItemContext);
    const accordionContext = useContext(AccordionContext);

    if (!context || !accordionContext) 
        throw new Error("AccordionHeader must be a child of an AccordionItem");

    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (ref.current) {
            accordionContext.setHeaders(prev => {
                if (!ref.current) return prev
                return [...prev.filter((el) => el !== ref.current), ref.current]
            });
        }
    }, [ref]);

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
        id={context.id}
        onClick={context.toggle}
        onKeyDown={handleKeyPress}
        className={className ?? styles.accordionHeader}
        aria-expanded={context.isOpen}
        aria-label="Accordion Header"
    >
        {children}
        <FontAwesomeIcon 
            icon={faChevronDown}
            className={`${styles.headerIcon} ${context.isOpen ? styles.rotate : ''}`} 
        />
    </button>
  );
}

//--------------------------------------------------------------------//

type AccordionBodyProps = {
    className?: string;
    children: ReactNode;
};

function AccordionBody({ className, children }: AccordionBodyProps) {
    const context = useContext(AccordionItemContext);
    if (!context) throw new Error("AccordionBody must be a child of an AccordionItem");

    return (
        <div 
            className={`${className ?? styles.accordionBody} ${context.isOpen ? styles.show : ''}`}
            role="region"
            aria-labelledby={context.id}
            aria-hidden={!context.isOpen}
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