import React, { useState } from 'react'

import { 
    Accordion, 
    AccordionBody, 
    AccordionHeader, 
    AccordionItem 
} from './components/accordion'

import { 
    Toast, 
    ToastItem 
} from './components/toast'

import { 
    TooltipPopup, 
    TooltipWrap 
} from './components/tooltip';

import "./styles.css"
import { Select, SelectItem } from './components/select/Select';
import { Dialog, DialogCloseButton, DialogWrapper } from './components/dialog/Dialog';

export default function App() {
    const [showToast, setShowToast] = useState(true);
    const [showDialog, setShowDialog] = useState(true);
    const data = [
        {
            id: '1',
            name: 'Section 1',
            content: 'Content for section 1'
        },
        {
            id: '2',
            name: 'Section 2',
            content: 'Content for section 2'
        },
        {
            id: '3',
            name: 'Section 3',
            content: 
                `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate 
                aut incidunt ducimus ad enim cumque esse. Quam placeat perspiciatis 
                totam praesentium nihil libero commodi modi laboriosam, aspernatur 
                architecto doloremque quasi!`
        }
    ]

    return (
        <div>
            <h1>React-UI</h1>
            <button onClick={() => setShowToast(!showToast)}>Show/Hide Toast</button>
            <button onClick={() => setShowDialog(!showDialog)}>Show/Hide Dialog</button>

            <Accordion mode='single'>
                {data.map(x => (
                    <AccordionItem key={x.id}>
                        <AccordionHeader>{x.name}</AccordionHeader>
                        <AccordionBody>{x.content}</AccordionBody>
                    </AccordionItem>
                ))}
            </Accordion>

            <Dialog 
                onClose={() => setShowDialog(false)} 
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
                        Dialog Content
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ab vel numquam deleniti sed mollitia quisquam cum error vero nesciunt nam eos vitae explicabo incidunt, omnis enim aliquam quo. Culpa!
                    </div>
                </DialogWrapper>
            </Dialog>

            <Toast
                onClose={() => setShowToast(false)}
                position='top-right' 
                timeoutDuration={5000} 
                showToast={showToast} 
                progressBar={true}
            >
                <ToastItem>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        This is a toast!
                    </div>
                </ToastItem>
            </Toast>

            <TooltipWrap style={{margin: "20px"}}>
                <button style={{padding: '.5rem 1rem', background: "#3f383b", color: "#fff", borderRadius: "5px"}}>Add</button>
                <TooltipPopup
                    content='Add to cart'
                    position='bottom-center'
                >
                </TooltipPopup>
            </TooltipWrap>

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
        </div>
    )
}
