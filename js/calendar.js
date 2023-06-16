// ----------------------- DOM ELEMENTS -----------------------
const calendar = document.querySelector(".calendar"),
    dayGrid = document.querySelector(".calender-days-grid"),
    dayView = document.querySelector("#dayView"),
    timeBooking = document.querySelector(".booking"),
    dateHeader = document.querySelector(".month-header"),
    welcomeMsgDiv = document.querySelector("#welcomeMsg");

// ----------------------- GLOBAL VARIABLES -----------------------
// Courtesy of https://gist.github.com/seripap/9eb809268eb8026abd9f
const months = Array.from({length: 12}, (e, i) => {
        return new Date(null, i + 1, null).toLocaleDateString("en", {month: "long"});
    }),
    weekdays = Array.from({length: 7}, (e, i) => {
        return new Date(null, null , i).toLocaleDateString("en", {weekday: "long"});
    }),
    timeslots = ["08", "12", "17"];

let today = new Date(),
    month = today.getMonth(),
    year = today.getFullYear(),
    currentDate,
    currentList = "63fd07e82a491a4d0882d577";

const renderMonthCal = async() => {
    // Clears calender & booking form when month changes
    dayGrid.innerHTML = "";
    dayView.innerHTML = "";

    // const { bookings, usersBooking } = await fetchBookings(currentList);
    const res = await fetchData("bookings");
    const response = await fetchData("user/booking");

    const bookings = res.bookings
    const usersBooking = response.booking.date;

    // Updates month header 
    dateHeader.innerHTML =  `<h2>${months[month]} ${year}</h2>`;

    const dates = generateMonthViewDates(year, month)
    // console.log(dates);

    // Loops through the dates array and renders them to the DOM
    dates.forEach(({date, month, prevMonth, nextMonth}, index) => {
        // Checks if a new row needs to be created
        if(index++ % 7 === 0) {
            row = createElement("div", "row g-0")
            dayGrid.append(row);
        }
        row.append(createElement("li", 
        `${isDayBooked(usersBooking, year, month, date)} 
        ${checkIfDayisToday(year, month, date)}
            ${deactivatePassedDates(year, month, date)}
            ${prevMonth ? "prevMonth" : nextMonth ? "nextMonth" : ""}
            day col d-flex justify-content-center align-items-center`, 
            date)
        )
    })

    // Iniates day view function for each calender button
    renderDayView(bookings)
}

// const fetchBookings = async (list) => {
//     // Fetches all bookings from API
//     const bookings = await fetchData(list);
    
//     return {
//         // Creates a new array with a Date object for each booked date
//         bookings: bookings.map(date => new Date(date.booking)),
//         // Finds the signed in user's booking from the api bookings
//         usersBooking: findUsersBooking(bookings),
//     };
// };

const generateMonthViewDates = (year, month) => {
    // The previous months last date
    let prevLastDay = new Date(year, month, 0),
        prevMonthsLastDate = prevLastDay.getDate(),
        // The spill over dates from the month before
        prevDays = prevLastDay.getDay(),
        // Current months last
        lastDay = new Date(year, month + 1, 0),
        lastDate = lastDay.getDate(),
        /* The remaining dates, from the next month, which happen in the current months last week.
        If the last date is a sunday - set nexDays to a zero, as to not render any days from the next month */
        nextDays = 7 - (lastDay.getDay() === 0 ? 7 : lastDay.getDay());

    // Create an empty array to store the currently rendered months dates
    const dates = [];

    // Loops through the days of the previous month and adds them to the dates array
    for (let day = prevMonthsLastDate - prevDays + 1; day <= prevMonthsLastDate; day++) {
        dates.push({ 
            date: day, 
            month: month -1,
            prevMonth: true,
        });
    }
    // Loops through the days of the current month and adds them to the dates array
    for (let day = 1; day <= lastDate ; day++) {
        dates.push({ 
            date: day, 
            month: month,
        });
    }
    // Loops through the days of the next month and adds them to the dates array
    for (let day = 1; day <= nextDays; day++) {
        dates.push({ 
            date: day, 
            month: month + 1,
            nextMonth: true,
        });
    }
    return dates;
}

// ----------------------- ALTER MONTH -----------------------
const alterMonth = (str) => {
    if(str === "add") {
        if(month === 11) {
            year++
            month = -1
        }
        month++
    } else {
        if(month === 0) {
            year--
            month = 12
        }
        month--
    }
    renderMonthCal()
}

// ----------------------- CHECKS IF D1 IS PASSED D2 -----------------------
const hasDatePassed = (d1, d2) => {
    // Create a new date of the existing dates to cancel out the time
    return new Date(d1.toDateString()) < new Date(d2.toDateString())
}

// ----------------------- DEACTIVATES LI CAL DATE IF DATE HAS ALREADY PASSED -----------------------
const deactivatePassedDates = (year, month, day) => {
    date = new Date(year, month, day)
    // Create a new date of the existing dates to cancel out the time
    return hasDatePassed(date, today) ? "deactivated" : "";
}

// ----------------------- DETERMINES IF A DAY IS TODAY' DATE -----------------------
const checkIfDayisToday = (year, month, day) => {
    return areDatesEqual(today, new Date(year, month, day)) ? "today" : ""
}

// ----------------------- DETERMINES IF DAY IS BOOKED -----------------------
const isDayBooked = (bookedTime, year, month, day) => {
    if(bookedTime) {
        return areDatesEqual(new Date(bookedTime), new Date(year, month, day))
            ? "booked"
            : "";
    }
}

// ----------------------- DETERMINES IF TWO DATES ARE EQUAL -----------------------
const areDatesEqual = (d1, d2) => {
    return d1.toDateString() === d2.toDateString()
}