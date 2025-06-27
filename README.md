# Atom-UI

**Atom-UI** is a project for React & Typescript as a component library. It aims to be simple, lightweight, with no external dependencies and fully accessible. 

---

## Features

- Lightweight and minimal
- Fully accessible
- Customizable CSS, or just use the default styles
- Plug-and-play components
- No dependencies beyond React

---

## Installation

... coming eventually

## Components

 - Accordion
 - Toast (WIP)
 - Dropdown (WIP)

## Usage

Example using the Accordion component!

```tsx
import {
   Accordion,  
   AccordionItem,
   AccordionHeader,
   AccordionBody
} from "react-ui";

function App() {
  return (
    <Accordion>
        <AccordionItem>
            <AccordionHeader>Section 1</AccordionHeader>
            <AccordionBody>Content for section 1</AccordionBody>
        </AccordionItem>

        <AccordionItem>
            <AccordionHeader>Section 2</AccordionHeader>
            <AccordionBody>Content for section 2</AccordionBody>
        </AccordionItem>

        <AccordionItem>
            <AccordionHeader>Section 3</AccordionHeader>
            <AccordionBody>Content for section 3</AccordionBody>
        </AccordionItem>
    </Accordion>
  );
}
```