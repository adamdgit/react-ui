import React from 'react'

import { 
    Accordion, 
    AccordionBody, 
    AccordionHeader, 
    AccordionItem 
} from './components/accordion'

import { 
    Toast, 
    ToastHeader 
} from './components/toast'

export default function App() {
  return (
    <div>
        <h1>Hello world</h1>
        <Accordion>
            <AccordionItem>
                <AccordionHeader>Section 1 blah blah blah blah blah section 1 section 1</AccordionHeader>
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

        <Toast position='top-center'>
            <ToastHeader>Test toast</ToastHeader>
        </Toast>
    </div>
  )
}
