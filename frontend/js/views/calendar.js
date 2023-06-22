import AbstractView from "./AbstractView.js";

import { addClass, dateToText } from "../helper.js";
import { fetchData } from "../api.js";
import { addBooking } from "../userBooking.js";

import { app, months, month, year, today, updateMonth, weekdays } from "../variables.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Calendar");
    }
    generateMonthViewDates(year, month) {
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
        for (
            let day = prevMonthsLastDate - prevDays + 1;
            day <= prevMonthsLastDate;
            day++
        ) {
            dates.push({
                date: day,
                month: month - 1,
                prevMonth: true,
            });
        }
        // Loops through the days of the current month and adds them to the dates array
        for (let day = 1; day <= lastDate; day++) {
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
    async alterMonth(str) {
        updateMonth(str);
        await this.updateUI();
    }
    async updateUI() {
        try {
            app.innerHTML = await this.getHtml();
            // Re-add event listeners after updating the UI since they are "removed" when reloading the HTML
            this.addEventListeners();
        } catch (error) {
            console.error("Error occurred:", error);
            displayModal();
        }
    }
    async getHtml() {
        try {
            const response = await fetchData("user/booking");
            const usersBooking = response.booking?.date;

            // Array of the currently rendered months cal days
            const monthDatesArr = this.generateMonthViewDates(year, month);

            // Generates calendar month view
            const html = `
            <div class="container">

                <div class="row">
                    <!--! CALENDER-->
                    <div class="calendar container">
                        <!-- HEADER MONTH - CONTROLLER-->
                        <header class="row d-flex align-items-center m-0 my-5">
                            <div class="col-auto text-start"><button class="btn border-0" id="prevMonthBtn"><i class="fas fa-angle-left"></i></button></div>
                            <div class="month-header col text-center"><h2>${
                                months[month]
                            } ${year}</h2></div>
                            <div class="col-auto text-end"><button class="btn border-0" id="nextMonthBtn"><i class="fas fa-angle-right"></i></button></div>
                        </header>
    
                        <!-- WEEKDAYS-->
                        <div class="weekdays row text-center mb-3 gx-0">
                            <div class="col"><h3>M</h3></div>
                            <div class="col"><h3>T</h3></div>
                            <div class="col"><h3>W</h3></div>
                            <div class="col"><h3>T</h3></div>
                            <div class="col"><h3>F</h3></div>
                            <div class="col"><h3>S</h3></div>
                            <div class="col"><h3>S</h3></div>
                        </div>
                        <!-- CALENDER DAYS GRID-->
                        <ul id="calendarDaysGrid" class="calender-days-grid text-center p-0">
                            ${monthDatesArr
                                .map(
                                    (
                                        { date, month, prevMonth, nextMonth },
                                        index
                                    ) => {
                                        // Check if a new row needs to be created
                                        let rowHtml = "";
                                        if (index % 7 === 0) {
                                            rowHtml = `<div class="row g-0">`;
                                        }

                                        return `${rowHtml}<li class="${isDayBooked(
                                            usersBooking,
                                            year,
                                            month,
                                            date
                                        )} ${checkIfDayisToday(
                                            year,
                                            month,
                                            date
                                        )}${deactivatePassedDates(
                                            year,
                                            month,
                                            date
                                        )} ${
                                            prevMonth
                                                ? "prevMonth"
                                                : nextMonth
                                                ? "nextMonth"
                                                : ""
                                        } day col d-flex justify-content-center align-items-center">${date}</li>`;
                                    }
                                )
                                .join("")}                   
                        </ul>
                    </div>
                </div>
                <!-- INSTRUCTIONS-->
                <div class="instructions container">
                    <div class="row">
                        <div class="col-auto booked"></div>
                        <p class="col-auto"><b>Your confirmed booking</b></p>
                    </div>
                </div>
                <div class="row">
                    <!-- DAY VIEW -->
                    <div class="day-view" id="dayView">
                        <!-- Form inserted via JS -->
                    </div>
                    
                </div>
            </div>`;

            return html;
        } catch (error) {
            // Handle any network or server errors
            console.error("Calendar  error:", error);
            //todo! modal display
            return "";
        }
    }
    addEventListeners() {
        // ----------------------- ALTER MONTH -----------------------
        document
            .querySelector("#prevMonthBtn")
            .addEventListener("click", () => {
                this.alterMonth("prev");
            });
        document
            .querySelector("#nextMonthBtn")
            .addEventListener("click", () => {
                this.alterMonth("add");
            });
        // ----------------------- DAY VIEW -----------------------
        const dayGrid = document
            .querySelector("#calendarDaysGrid")
        const dayView = document.querySelector("#dayView");

        dayGrid
            .querySelectorAll(".day:not(.deactivated)")
            .forEach((li) => {
                li.addEventListener("click", async () => {
                    //todo bryt ut till funktion
                    const response = await fetchData("user/booking");
                    const userHasBooking = response.booking;

                    // If another cal-day has the active class - remove it
                    dayGrid
                        .querySelector(".active")
                        ?.classList.remove("active");
                    addClass([li], "active");
                    // Get the name of the month based on the clicked day's class
                    const monthName = li.classList.contains("prevMonth")
                        ? months[month - 1]
                        : li.classList.contains("nextMonth")
                        ? months[month + 1]
                        : months[month];

                    const currentDate = new Date(
                        year,
                        months.indexOf(monthName),
                        li.innerText
                    );
                    dayView.innerHTML = `
                    <form id="bookTime" class="container">
                        <div class="mb-5">
                            <h2 class="row gx-0 mb-4">
                                <span class="weekday col">${
                                    weekdays[currentDate.getDay()]
                                }</span>
                                <span class="date col text-end">${
                                    li.innerText
                                } ${monthName}</span>
                            </h2>
                            <div class="row gx-0 text-center">
                                <div class="col d-flex justify-content-center align-items-center">
                                    <input type="radio" name="time-slot" id="morning" value="08" required/>
                                    <label for="morning">08</label>
                                </div>
                                <div class="col d-flex justify-content-center align-items-center"/>
                                    <input type="radio" name="time-slot" id="noon" value="12">
                                    <label for="noon">12</label>
                                </div>
                                <div class="col d-flex justify-content-center align-items-center"/>
                                    <input type="radio" name="time-slot" id="evening" value="17">
                                    <label for="evening">17</label>
                                </div>
                                <div class="mt-4">
                                    <p class="m-0"></p>
                                </div>
                                <div class="mt-4"><button type="submit" class="button primary-btn" ${
                                    userHasBooking ? "disabled" : ""
                                }>Book</button></div>
                            </div>
                        </div>
                    </form>`;
                    this.initateFormEventListener(
                        document.querySelector("#bookTime"),
                        currentDate
                    );
                    this.updateSelectedDateTime(currentDate);

                    const res = await fetchData("bookings");
                    const bookings = res.bookings;

                    //todo - break out as function
                    let bookedTimes;
                    // Checks if currentDate is already booked
                    // Returns every date obj that matches the current looped date - otherwise []
                    const match = bookings.filter(
                        (date) =>
                            new Date(date.date).toLocaleDateString() ===
                            currentDate.toLocaleDateString()
                    );
                    // If bookings exists in currentDate - get the time slots
                    match.length > 0
                        ? (bookedTimes = match.map((date) =>
                              new Date(date.date).getHours()
                          ))
                        : "";
                    // If current date is already booked - disable radio for booked time slots
                    bookedTimes ? diasableElem(bookedTimes) : "";
                });
            });
    }
    // Improve - can i add it to other eventlisteners somehow
    updateSelectedDateTime (currentDate) {
    document
        .querySelectorAll("input[type='radio'][name='time-slot']")
        .forEach((slot) =>
            slot.addEventListener("change", async (e) => {
                // Gets the latest data on wether the signed in user har a bookingfrom database to always show the most up-to-date information,
                const response = await fetchData("user/booking");
                const userHasBooking = response.booking;

                /* Sets currentDate's time to the selected radio buttons time slot value */
                currentDate.setHours(e.target.value, 0, 0);

                // Displays a message to the user based on whether they have a booking or not
                dayView.querySelector("p").innerHTML = !userHasBooking
                    ? `You've selected <b>${dateToText(
                          currentDate
                      )}</b>. To complete the process, please book this date.`
                    : "You already have a laundry booking. </br>Please cancel it on your account page before making a new one. ";
            })
        );
    };
    initateFormEventListener (bookingForm, choosenDate) {
        bookingForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            addBooking(e.target, choosenDate);
        });
    };

}

// ----------------------- CHECKS IF D1 IS PASSED D2 -----------------------
const hasDatePassed = (d1, d2) => {
    // Create a new date of the existing dates to cancel out the time
    return new Date(d1.toDateString()) < new Date(d2.toDateString());
};

// ----------------------- DEACTIVATES LI CAL DATE IF DATE HAS ALREADY PASSED -----------------------
const deactivatePassedDates = (year, month, day) => {
    const date = new Date(year, month, day);
    // Create a new date of the existing dates to cancel out the time
    return hasDatePassed(date, today) ? "deactivated" : "";
};

// ----------------------- DETERMINES IF A DAY IS TODAY' DATE -----------------------
const checkIfDayisToday = (year, month, day) => {
    return areDatesEqual(today, new Date(year, month, day)) ? "today" : "";
};

// ----------------------- DETERMINES IF DAY IS BOOKED -----------------------
const isDayBooked = (bookedTime, year, month, day) => {
    if (bookedTime) {
        return areDatesEqual(new Date(bookedTime), new Date(year, month, day))
            ? "booked"
            : "";
    }
};

// ----------------------- DETERMINES IF TWO DATES ARE EQUAL -----------------------
const areDatesEqual = (d1, d2) => {
    return d1.toDateString() === d2.toDateString();
};
