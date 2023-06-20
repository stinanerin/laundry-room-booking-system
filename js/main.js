import { loadPage } from "./userSession.js";
import { alterMonth } from "./calendar.js";
import { toggleClass } from "./helper.js";
import { loginUser } from "./login.js";
import { registerUser } from "./register.js";

import { registerContainer, loginContainer } from "./variables.js";


loadPage();

document.querySelector("#prevMonthBtn").addEventListener("click", () => {
    alterMonth("prev");
});
document.querySelector("#nextMonthBtn").addEventListener("click", () => {
    alterMonth("add");
});

// ----------------------- LOGIN / REGISTER USER -----------------------
const loginForm = document.querySelector("#loginForm");
const registerUserForm = document.querySelector("#registerUser");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    loginUser();
})
registerUserForm.addEventListener("submit", (e) => {
    e.preventDefault()

    registerUser();
})

// ----------------------- TOGGLE BETWEEN REGISTER / LOGIN VIEW -----------------------
document.querySelector("#loginLink").addEventListener("click", () => {
    toggleClass([registerContainer, loginContainer], "hidden");
});
document.querySelector("#registerLink").addEventListener("click", () => {
    toggleClass([registerContainer, loginContainer], "hidden");
});

document.querySelector("#logo").addEventListener("click", () => {
    location.reload();
    // removeClass([calender], "hidden")
    // clearElem([welcomeMsgDiv]);
});

document.querySelector("#closeModal").addEventListener("click", () => {
    modal.close();
});
