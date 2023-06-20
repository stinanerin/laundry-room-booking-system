import { dayGrid, months, month, year, weekdays } from "./variables.js";
import { addClass, diasableElem, dateToText } from "./helper.js";
import { fetchData } from "./api.js";
import { addBooking } from "./userBooking.js";

// ----------------------- DAY VIEW WHEN YOU CLICK A CAL. DATE -----------------------
export const renderDayView = (bookings) => {
    dayGrid.querySelectorAll(".day:not(.deactivated)").forEach((li) => {
        li.addEventListener("click", async () => {
            const response = await fetchData("user/booking");
            const userHasBooking = response.booking;

            // If another cal-day has the active class - remove it
            dayGrid.querySelector(".active")?.classList.remove("active");
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
            initateFormEventListener(
                document.querySelector("#bookTime"),
                currentDate
            );
            updateSelectedDateTime(currentDate);

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
};

// ----------------------- UPDATE SELECTED DATES TIME SLOT -----------------------
const updateSelectedDateTime = (currentDate) => {
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

// ----------------------- EVENTLISTENER - FORM TO BOOK TIME SLOT -----------------------
const initateFormEventListener = (bookingForm, choosenDate) => {
    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        addBooking(e.target, choosenDate);
    });
};
