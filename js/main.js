loadPage();

document.querySelector("#prevMonthBtn").addEventListener("click", () => {
    alterMonth("prev");
});
document.querySelector("#nextMonthBtn").addEventListener("click", () => {
    alterMonth("add");
});

// ----------------------- TOGGLE BETWEEN REGISTER / LOGIN VIEW -----------------------
loginUserLink.addEventListener("click", () => {
    toggleClass([registerContainer, loginContainer], "hidden");
});
registerUserLink.addEventListener("click", () => {
    toggleClass([registerContainer, loginContainer], "hidden");
});

document.querySelector("#logo").addEventListener("click", () => {
    location.reload();
    // removeClass([calender], "hidden")
    // clearElem([welcomeMsgDiv]);
});
