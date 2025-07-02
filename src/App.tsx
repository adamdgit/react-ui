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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Ipsa vero praesentium repudiandae magnam obcaecati, omnis sequi voluptatibus 
                        voluptatum ab debitis placeat esse accusamus quasi possimus aspernatur 
                        cumque recusandae voluptates cum!
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
                        TESTING TOAST
                    </div>
                </ToastItem>
            </Toast>

            <div style={{padding: '30px'}}>
                <TooltipWrap>
                    <button style={{padding: '5px'}}>+</button>
                    <TooltipPopup 
                        content='Add to cart'
                        position='bottom-center'
                    >
                    </TooltipPopup>
                </TooltipWrap>
            </div>

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
