import { useState } from 'react'
import "./styles.css"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from './components/accordion'
import { Toast, ToastContent } from './components/toast'
import { TooltipPopup, Tooltip } from './components/tooltip';
import { Select, SelectItem, SelectList } from './components/select';
import { Dialog, DialogCloseButton } from './components/dialog';
import { Calendar } from './components/calendar';
import { Rating } from './components/rating';
import { DialogContent } from './components/dialog/Dialog';
import type { CSSThemeOverride, RatingData } from './types';

// const ThemeOverrides: CSSThemeOverride = {
//     primaryColor: "#111",
//     secondaryColor: "#333",
//     accentColor: "#e72173ff",
//     textColorPrimary: "white",
//     textColorSecondary: "#ccc",
//     textColorAccent: "#999",
//     boxShadow: "0 4px 15px 4px #2b2b2bff",
//     hoverBGColor: '#c21b61ff',
//     hoverTextColor: 'white',
//     border: '1px solid #666'
// }

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

    const ratings: RatingData[] = [
        { name: "Bad", value: 1 },
        { name: "Poor", value: 2 },
        { name: "Neutral", value: 3 },
        { name: "Good", value: 4 },
        { name: "Excellent", value: 5 },
    ]

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
                    dayLabelType='Single'
                    cellSize={"50px"}
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
                    style={{ boxShadow: "unset" }}
                    textPosition='top'
                    allowHalfRatings={false}
                    data={ratings}
                    onChange={(val) => console.log('selected:', val)}
                    iconEmpty={<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill='currentColor' viewBox="0 0 640 640">{`<!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->`}<path d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z"/></svg>}
                    iconFull={<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill='currentColor' viewBox="0 0 640 640">{`<!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->`}<path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>}
                />
            </div>
        </div>
    )
}
