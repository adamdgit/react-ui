import { useEffect, useState } from "react"
import styles from "./calendar.module.css";
import type { CalendarProps, DaySelectProps } from "../../types";
import { Select, SelectItem, SelectList } from "../select";

//--------------------------------------------------------------------//

function Calendar({ classMap, styleMap, mode, showChangeMonthButtons, yearDropdownData, onClose, onSelectDay, onSelectMonth, onSelectYear }: CalendarProps) {
    const [calendarYears] = useState(yearDropdownData ?? generateYearsDropdown);
    const [calendarMonths] = useState(generateMonthsDropdown);
    const [calendarData, setCalendarData] = useState<Date[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Recalculate calendar days whenever month or year select is changed
    useEffect(() => {
        setCalendarData(
            generateCalendarDays(Number(selectedMonth), Number(selectedYear))
        );
    },[selectedMonth, selectedYear])

    function handleSelectYear(year: number) {
        onSelectYear(year);
        setSelectedYear(year);
    };

    function handleSelectMonth(month: number) {
        // Prevent calendar going back past earliest date provided
        if (month < 0 && selectedYear === calendarYears[0]) {
            return
        }
        if (month < 0) {
            month = 11; // December (back 1 year)
            handleSelectYear(selectedYear -1);
        }
        if (month > 11) {
            month = 0; // january (forward 1 year)
            handleSelectYear(selectedYear +1);
        }

        onSelectMonth(month);
        setSelectedMonth(month);
    };

    return (
        <div 
            className={classMap?.calendarWrap ?? styles.calendarWrap}
            style={styleMap?.calendarWrap}
        >
            <div className={classMap?.calendarHeader ?? styles.calendarHeader}>
                <div className={classMap?.headerWrap ?? styles.headerWrap}>
                    {showChangeMonthButtons && 
                    <button 
                        className={classMap?.changeMonthBtn ?? styles.changeMonthBtn}
                        onClick={() => handleSelectMonth(selectedMonth -1)}
                    >
                        {'<'}
                    </button>}
                    <Select
                        value={selectedYear}
                        classMap={{
                            show: styles.show,
                            selectInput: classMap?.yearInput ?? styles.yearInput,
                            selectDropdown: classMap?.yearDropdown ?? styles.yearDropdown
                        }}
                        id='year'
                        label='Year'
                        onChange={(val) => handleSelectYear(Number(val))}
                    >
                        <SelectList>
                            {calendarYears.map((year) => 
                                <SelectItem 
                                    className={classMap?.yearInputOpt ?? styles.yearInputOpt}
                                    key={year} 
                                    value={year}
                                >
                                    {year}
                                </SelectItem>
                            )}
                        </SelectList>
                    </Select>

                    <Select
                        value={calendarMonths[selectedMonth].month}
                        classMap={{ 
                            show: styles.show,
                            selectDropdown: classMap?.monthDropdown ?? styles.monthDropdown,
                            selectInput: classMap?.monthInput ?? styles.monthInput
                        }}
                        id='month'
                        label='Month'
                        onChange={(val) => handleSelectMonth(Number(val))}
                    >
                        <SelectList>
                            {calendarMonths.map(month => 
                                <SelectItem 
                                    className={classMap?.monthInputOpt ?? styles.monthInputOpt} 
                                    key={month.value}
                                    value={month.value}
                                >
                                    {month.month}
                                </SelectItem>
                            )}
                        </SelectList>
                    </Select>
                    {showChangeMonthButtons && 
                    <button 
                        className={classMap?.changeMonthBtn ?? styles.changeMonthBtn}
                        onClick={() => handleSelectMonth(selectedMonth +1)}
                    >
                        {'>'}
                    </button>}
                </div>

                <div className={classMap?.dayLabelsWrap ?? styles.dayLabelsWrap}>
                    <div className={classMap?.dayLabel ?? styles.dayLabel}>Mon</div>
                    <div className={classMap?.dayLabel ?? styles.dayLabel}>Tue</div>
                    <div className={classMap?.dayLabel ?? styles.dayLabel}>Wed</div>
                    <div className={classMap?.dayLabel ?? styles.dayLabel}>Thu</div>
                    <div className={classMap?.dayLabel ?? styles.dayLabel}>Fri</div>
                    <div className={classMap?.dayLabel ?? styles.dayLabel}>Sat</div>
                    <div className={classMap?.dayLabel ?? styles.dayLabel}>Sun</div>
                </div>
            </div>

            <div
                className={classMap?.calendarBody ?? styles.calendarBody}
            >
                {calendarData.map((day, i) => 
                    <DaySelect 
                        key={i}
                        month={Number(selectedMonth)}
                        onSelectDay={onSelectDay}
                        day={day}
                    />
                )}
            </div>
        </div>
    )
}

//--------------------------------------------------------------------//

function DaySelect({ day, month, onSelectDay }: DaySelectProps) {
    function dayIsToday(day: Date) {
        const today = new Date();
        return (
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear()
        );
    }

    function dayIsInCurrentMonth(day: Date) {
        return day.getMonth() === month
    }

    return (
        <button
            onClick={() => onSelectDay(day)}
            className={`${styles.date} ${
                dayIsToday(day) ? styles.today :
                !dayIsInCurrentMonth(day) ? styles.notCurrentMonth :
            ''}`}
            value={day.toLocaleString('en-au', { day: '2-digit', month: '2-digit', year: 'numeric' })}>
            {day.toLocaleString('en-au', { day: 'numeric' })}
        </button>
    )
}

//--------------------------Util Functions----------------------------//

function generateYearsDropdown() {
    const data = [];
    const currentYear = Number(new Date().getFullYear());
    data.push(currentYear)
    for (let i = 1; i < 15; i ++) {
        data.push(currentYear +i)
    }
    return data;
}

function generateMonthsDropdown() {
    return [
        { month: "January", value: 0 },
        { month: "February", value: 1 },
        { month: "March", value: 2 },
        { month: "April", value: 3 },
        { month: "May", value: 4 },
        { month: "June", value: 5 },
        { month: "July", value: 6 },
        { month: "August", value: 7 },
        { month: "September", value: 8 },
        { month: "October", value: 9 },
        { month: "November", value: 10 },
        { month: "December", value: 11 },
    ];
}

// Calculates days of previous and next months as well as current month
function generateCalendarDays(month: number, year: number) {
    const data: Date[] = [];

    // Date variables to calculate previous, current and next months dates
    const currentMonth = new Date(year, month, 1);
    const firstDayPrevMonth = new Date(year, month, 0).getDate();

    // getDay() returns day as int 0=sun, 1=mon.. 6=sat etc
    let firstDayMonth = new Date(year, month, 1, 0).getDay();

    // Sunday is counted as 0, must convert to 7 for calculations below
    if (firstDayMonth == 0) firstDayMonth = 7;

    const calc = (firstDayPrevMonth + 1) - (firstDayMonth - 1);
    const prevMonth = new Date(year, month - 1, calc);
    const lastDayMonth = new Date(year, month + 1, 0).getDay();
    const nextMonth = new Date(year, month + 1, 1);

    // show some days from previous month
    for (let i = (firstDayPrevMonth + 1) - firstDayMonth; i < firstDayPrevMonth; i++) {
        const prevMonthDays = new Date(prevMonth);
        prevMonth.setDate(prevMonth.getDate() + 1);
        data.push(prevMonthDays);
    }
    // current month calc
    while (currentMonth.getMonth() === month) {
        const currentMonthDay = new Date(currentMonth);
        currentMonth.setDate(currentMonth.getDate() + 1);
        data.push(currentMonthDay);
    }
    // show some days from next month
    for (let i = 1; i <= 7 - lastDayMonth; i++) {
        const nextMonthDays = new Date(nextMonth);
        nextMonth.setDate(nextMonth.getDate() + 1);
        data.push(nextMonthDays);
    }

    return data;
}

export {
    Calendar,
}