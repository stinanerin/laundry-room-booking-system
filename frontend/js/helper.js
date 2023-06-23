export const createElement = (type, aClass, str, arr) => {
    let elem = document.createElement(type);
    if (aClass) {
        elem.className = aClass;
    }
    if (str) {
        elem.innerText = str;
    }
    if (arr) {
    }
    return elem;
};

//! todo - make dynamic
export const diasableElem = (arr) => {
    document
        .querySelectorAll("input[type='radio'][name='time-slot']")
        .forEach((radio) => {
            arr.includes(+radio.value) ? (radio.disabled = true) : "";
        });
};

export const toggleClass = (arr, aClass) => {
    arr.forEach((elem) => elem.classList.toggle(aClass));
};

export const addClass = (arr, aClass) => {
    arr.forEach((elem) => elem.classList.add(aClass));
};

export const removeClass = (arr, aClass) => {
    arr.forEach((elem) => elem.classList.remove(aClass));
};

export const clearElem = (arr) => {
    arr.forEach((elem) => (elem.innerHTML = ""));
};

export const clearValue = (arr) => {
    arr.forEach((elem) => (elem.value = ""));
};

export const toUpperCaseStr = (str) =>
    str
        .split(" ")
        .map((word) => {
            return word[0].toUpperCase() + word.slice(1);
        })
        .join(" ");

export const dateToText = (dateStr) => {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(new Date(dateStr));
};

// ----------------------- CHECKS IF D1 IS PASSED D2 -----------------------
export const hasDatePassed = (d1, d2) => {
    // Create a new date of the existing dates to cancel out the time
    return new Date(d1.toDateString()) < new Date(d2.toDateString());
};

// ----------------------- DEACTIVATES LI CAL DATE IF DATE HAS ALREADY PASSED -----------------------
export const deactivatePassedDates = (year, month, day, today) => {
    const date = new Date(year, month, day);
    // Create a new date of the existing dates to cancel out the time
    return hasDatePassed(date, today) ? "deactivated" : "";
};

// ----------------------- DETERMINES IF A DAY IS TODAY' DATE -----------------------
export const checkIfDayisToday = (year, month, day, today) => {
    return areDatesEqual(today, new Date(year, month, day)) ? "today" : "";
};

// ----------------------- DETERMINES IF DAY IS BOOKED -----------------------
export const isDayBooked = (bookedTime, year, month, day) => {
    if (bookedTime) {
        return areDatesEqual(new Date(bookedTime), new Date(year, month, day))
            ? "booked"
            : "";
    }
};

// ----------------------- DETERMINES IF TWO DATES ARE EQUAL -----------------------
export const areDatesEqual = (d1, d2) => {
    return d1.toDateString() === d2.toDateString();
};
