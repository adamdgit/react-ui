# React-UI

**React-UI** is a WIP project, as a React & Typescript component library. It aims to be simple, lightweight, with no external dependencies. Just simple, accessible components. 

---

## Features

- Lightweight and minimal
- Easily customizable
- Built for React & Typescript
- Plug-and-play components
- No dependencies beyond React

---

## Installation

```bash
npm install react-ui
# or
yarn add react-ui
```

## Components

 - Accordion
 - Toast (WIP)
 - Dropdown (WIP)

## 🔧 Usage

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