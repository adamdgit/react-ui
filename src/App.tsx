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
import { Dialog } from './components/dialog/Dialog';

export default function App() {
    const [isOpen, setIsOpen] = useState(true);
    const data = [
        {
            name: 'Section 1',
            content: 'Content for section 1'
        },
        {
            name: 'Section 2',
            content: 'Content for section 2'
        },
        {
            name: 'Section 3',
            content: 
                `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate 
                aut incidunt ducimus ad enim cumque esse. Quam placeat perspiciatis 
                totam praesentium nihil libero commodi modi laboriosam, aspernatur 
                architecto doloremque quasi!`
        }
    ]

    function showToast() {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <h1>Hello world</h1>
            <button onClick={showToast}>Show/Hide Toast</button>

            <Accordion mode='single'>
                {data.map(x => (
                    <AccordionItem key={x.name}>
                        <AccordionHeader>{x.name}</AccordionHeader>
                        <AccordionBody>{x.content}</AccordionBody>
                    </AccordionItem>
                ))}
            </Accordion>

            <Dialog onClose={() => setIsOpen(false)} showDialog={isOpen}>
                <div style={{
                    display: 'grid',
                    gap: '1rem',
                    padding: '2rem',
                    background: "#1b191a",
                    border: "1px solid #4e4549",
                    color: 'white'
                }}>
                    Dialog Content
                    <button onClick={showToast}>Click me</button>
                </div>
            </Dialog>

            <Toast
                position='top-right' 
                durationMS={5000} 
                showToast={isOpen} 
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
