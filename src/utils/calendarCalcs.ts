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
    generateCalendarDays,
    generateMonthsDropdown,
    generateYearsDropdown
}