import { addData } from "./api.js";
import { loadPage } from "./userSession.js";
import { clearElem, displayError } from "./helper.js";

const loginError = document.querySelector("#loginAlert");
const email = document.querySelector("#loginEmail");
const password = document.querySelector("#loginPWD");

export const loginUser = async () => {
    const user = {
        loginEmail: email.value,
        loginPass: password.value,
    };

    const res = await addData("user/login", user);
    if (res.acknowledged) {
        console.log("user logged in");
        clearElem([loginError]);
        loadPage();
    } else if (res.customError) {
        console.log("email / pwd do not match");
        displayError(loginError, res.error);
    } else {
        console.log("login failed");
        //todo! Somethign went wrong - display error
    }
};
