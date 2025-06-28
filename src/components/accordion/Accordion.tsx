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
    className?: string,
    children: ReactNode
}

const AccordionContext = createContext<{
  registerHeader: (ref: HTMLButtonElement) => void;
  headers: HTMLButtonElement[];
} | null>(null);

function Accordion({ className, children }: AccordionProps) {
  const [headers, setHeaders] = useState<HTMLButtonElement[]>([]);

  const registerHeader = (ref: HTMLButtonElement) => {
    setHeaders((prev) => [...prev.filter((el) => el !== ref), ref]);
  };

  return (
    <AccordionContext.Provider value={{ headers, registerHeader }}>
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

const AccordionItemContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  buttonID: string;
} | null>(null);

type AccordionItemProps = {
    className?: string;
    children: ReactNode;
};

function AccordionItem({ className, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const buttonID = crypto.randomUUID();

  return (
    <AccordionItemContext.Provider value={{ isOpen, toggle, buttonID }}>
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
            accordionContext.registerHeader(ref.current);
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
      id={context.buttonID}
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
            aria-labelledby={context.buttonID}
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