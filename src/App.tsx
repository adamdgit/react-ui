import { useState } from 'react'
import "./styles.css"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from './components/accordion'
import { Toast, ToastContent } from './components/toast'
import { TooltipPopup, Tooltip } from './components/tooltip';
import { Select, SelectItem, SelectList } from './components/select';
import { Dialog, DialogCloseButton } from './components/dialog';
import { Calendar } from './components/calendar';
import { Rating, RatingItem } from './components/rating';
import { DialogContent } from './components/dialog/Dialog';
import type { CSSThemeOverride } from './types';

const ThemeOverrides: CSSThemeOverride = {
    primaryColor: "#111",
    secondaryColor: "#333",
    accentColor: "#e72173ff",
    textColorPrimary: "white",
    textColorSecondary: "#ccc",
    textColorAccent: "#999",
    boxShadow: "0 4px 15px 4px #2b2b2bff",
    hoverBGColor: '#c21b61ff',
    hoverTextColor: 'white',
    border: '1px solid #666'
}

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
    ];

    const ratings = [2,4,6,8]

    function handleCloseDialog() {
        setShowDialog(false)
        console.log("closed dialog")
    };

    function handleCloseToast() {
        setShowToast(false)
        console.log("closed toast")
    };

    return (
        <div>
            <h1>Atom-UI Showcase</h1>
            <button 
                className='btn'
                onClick={() => setShowToast(!showToast)}
            >
                Show/Hide Toast
            </button>
            <button 
                className='btn'
                onClick={() => setShowDialog(!showDialog)}
            >
                Show/Hide Dialog
            </button>

            <div className='container'>
                <Accordion mode='single'>
                    {data.map(x => (
                        <AccordionItem key={x.id}>
                            <AccordionHeader>{x.name}</AccordionHeader>
                            <AccordionBody>{x.content}</AccordionBody>
                        </AccordionItem>
                    ))}
                </Accordion>

                <Calendar
                    showChangeMonthButtons={true}
                    onSelectDay={(val) => console.log(val)}
                    onSelectMonth={(val) => console.log(val)}
                    onSelectYear={(val) => console.log(val)}
                />

                <Dialog 
                    onClose={handleCloseDialog} 
                    showDialog={showDialog}
                >
                    <DialogContent>
                        <DialogCloseButton />
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum modi illum et sunt fugit officia facilis natus accusamus corrupti rerum autem repellat blanditiis a, repudiandae quae tempore unde? Ex, saepe?</div>
                    </DialogContent>
                </Dialog>

                <Toast
                    onClose={handleCloseToast}
                    position='top-right' 
                    timeoutDuration={5000} 
                    showToast={showToast} 
                    progressBar={true}
                >
                    <ToastContent>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            This is a toast!
                        </div>
                    </ToastContent>
                </Toast>

                <Tooltip style={{margin: "20px"}}>
                    <button style={{padding: '.5rem 1rem', background: "var(--accentColor)", color: "#fff", borderRadius: "5px"}}>Add</button>
                    <TooltipPopup
                        content='Add to cart'
                        position='top-center'
                    >
                    </TooltipPopup>
                </Tooltip>

                <Select
                    id='select1'
                    label='Year'
                    onChange={(value) => console.log(value)}
                >
                    <SelectList>
                        <SelectItem value={2012}>2012</SelectItem>
                        <SelectItem value={2013}>2013</SelectItem>
                        <SelectItem value={2014}>2014</SelectItem>
                    </SelectList>
                </Select>

                <Rating
                    onChange={(val) => console.log('selected:', val)}
                >
                    {ratings.map(x => (
                        <RatingItem 
                            key={x} 
                            value={x} 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill='currentColor' viewBox="0 0 640 640">{`<!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->`}<path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>}
                        />
                    ))}
                </Rating>
            </div>
        </div>
    )
}
