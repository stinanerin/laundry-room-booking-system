export const dayGrid = document.querySelector("#calenderDaysGrid");
export const loginContainer = document.querySelector("#loginWrapper");
export const registerContainer = document.querySelector("#registerWrapper");

// Courtesy of https://gist.github.com/seripap/9eb809268eb8026abd9f
export const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(null, i + 1, null).toLocaleDateString("en", {
        month: "long",
    });
});

export const weekdays = Array.from({ length: 7 }, (e, i) => {
    return new Date(null, null, i).toLocaleDateString("en", {
        weekday: "long",
    });
});

//todo
export const timeslots = ["08", "12", "17"];

export let today = new Date();
export let month = today.getMonth();
export let year = today.getFullYear();
