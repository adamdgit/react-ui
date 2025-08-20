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
    const accordionData = [
        {
            id: '1',
            name: 'Section 1',
            content: 'Content for accordion item 1'
        },
        {
            id: '2',
            name: 'Section 2',
            content: 'Content for accordion item 2'
        },
        {
            id: '3',
            name: 'Section 3',
            content: `Content for accordion item 3`
        }
    ]

    return (
        <Accordion mode='single'>
            {accordionData.map(x => (
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

### Dialog

```tsx
function App() {
    const [showDialog, setShowDialog] = useState(false);

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <Dialog 
            onClose={handleCloseDialog} 
            showDialog={showDialog}
        >
            <DialogWrapper>
                <DialogCloseButton />
                <div style={{
                    display: 'grid',
                    gap: '1rem',
                    padding: '2rem',
                    background: "#1b191a",
                    border: "1px solid #4e4549",
                    color: 'white'
                }}>
                    Dialog content goes here, you can put anything here
                </div>
            </DialogWrapper>
        </Dialog>
    );
}
```