import { useEffect, useState } from "react"
import styles from "./calendar.module.css";
import type { CalendarProps, DaySelectProps } from "../../types";
import { Select, SelectItem, SelectList } from "../select";
import { convertThemeToCSSVars,} from "../../utils/convertCSSVars";
import { 
    generateCalendarDays, 
    generateMonthsDropdown, 
    generateYearsDropdown } 
from "../../utils/calendarCalcs";

//--------------------------------------------------------------------//

function Calendar({ classMap, styleMap, showChangeMonthButtons, yearDropdownData, onSelectDay, onSelectMonth, onSelectYear, cellSize, themeOverride }: CalendarProps) {
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

    // If user provides a theme override, updte the components theme variables
    const CSSVariables = themeOverride ? convertThemeToCSSVars(themeOverride) : {};
    
    return (
        <div 
            className={classMap?.calendarWrap ?? styles.calendarWrap}
            style={{
                ...styleMap?.calendarWrap, 
                ...CSSVariables,
                ...cellSize ? {"--cellSize": cellSize} : {}
            }}
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
                        className={classMap?.yearInput ?? styles.yearInput}
                        id='year'
                        label='Year'
                        onChange={(val) => handleSelectYear(Number(val))}
                    >
                        <SelectList className={classMap?.yearDropdown ?? styles.yearDropdown}>
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
                        className={classMap?.monthInput ?? styles.monthInput}
                        id='month'
                        label='Month'
                        onChange={(val) => handleSelectMonth(Number(val))}
                    >
                        <SelectList className={classMap?.monthDropdown ?? styles.monthDropdown}>
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

export {
    Calendar,
}