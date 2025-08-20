# Atom-UI
Created By Adam Demol. 

**Atom-UI** is a component library for React using Typescript. It aims to be simple, lightweight, customisable, and fully accessible. 

---

## Features

- Lightweight and minimal
- Fully accessible
- Customizable CSS, or just use the default styles
- Plug-and-play components
- No dependencies beyond React

---

## Installation

git clone https://github.com/adamdgit/react-ui

## Components

 - Accordion
 - Toast
 - Tooltip
 - Dropdown Select
 - Dialog with backdrop
 - Calendar (WIP)
 - Rating (coming soon)
 - Tablist (coming soon)
 - Popover (coming soon)
 - Comparison List (coming soon)

## Usage Examples

### Accordion

```tsx
function App() {
    return (
        <Accordion mode='single'>
            {data.map(x => (
                <AccordionItem key={x.id}>
                    <AccordionHeader>{x.name}</AccordionHeader>
                    <AccordionBody>{x.content}</AccordionBody>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
```

### Toast

```tsx
function App() {
    const [showToast, setShowToast] = useState(false);

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <Toast
            onClose={handleCloseToast}
            position='top-right' 
            timeoutDuration={5000} 
            showToast={showToast} 
            progressBar={true}
        >
            <ToastContent>
                <div>Custom toast content goes here</div>
            </ToastContent>
        </Toast>
    );
}
```

### Select

```tsx
function App() {
    return (
        <form>
            <Select
                id='select1'
                label='Year'
                onChange={(value) => console.log('changed', value)}
            >
                <SelectItem value={2012}>2012</SelectItem>
                <SelectItem value={2013}>2013</SelectItem>
                <SelectItem value={2014}>2014</SelectItem>
            </Select>
        </form>
    );
}
```