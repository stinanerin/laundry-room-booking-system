export const loginContainer = document.querySelector("#loginWrapper");
export const registerContainer = document.querySelector("#registerWrapper");
export const app = document.querySelector("#app")


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

//todo - flytta? - reassignment constant variable err msg

export function updateMonth(str) {
    if (str === "add") {
        if (month === 11) {
            year++;
            month = -1;
        }
        month++;
    } else {
        if (month === 0) {
            year--;
            month = 12;
        }
        month--;
    }
}