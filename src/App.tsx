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

export default function App() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <h1>Hello world</h1>
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
                    <AccordionBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate 
                        aut incidunt ducimus ad enim cumque esse. Quam placeat perspiciatis 
                        totam praesentium nihil libero commodi modi laboriosam, aspernatur 
                        architecto doloremque quasi!
                    </AccordionBody>
                </AccordionItem>
            </Accordion>

            <Toast 
                position='top-right' 
                durationMS={5000} 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
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
