# Atom-UI
Created By Adam Demol. 

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
 - Toast
 - Tooltip
 - Dialog with backdrop (coming soon)
 - Rating (coming soon)
 - Dropdown Select (coming soon)
 - Tablist (coming soon)
 - Popover (coming soon)
 - Comparison List (coming soon)

## Usage

Example using the Accordion component!

```tsx
import {
   Accordion,  
   AccordionItem,
   AccordionHeader,
   AccordionBody
} from "atom-ui";

function App() {
  return (
    <Accordion mode='single'>
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