import { addData } from "./api.js";
import { addClass, removeClass } from "./helper.js";
import { loadPage } from "./userSession.js";

const emailAlert = document.querySelector("#emailAlert");
const fullName = document.querySelector("#FullName");
const regEmail = document.querySelector("#email");
const pwd = document.querySelector("#pwd");

// ----------------------- VALIDATION - REGISTER USER -----------------------
export const registerUser = async () => {
    // Creates user in API
    const res = await addData("user/register", {
        regName: fullName.value,
        regEmail: regEmail.value,
        regPass: pwd.value,
    });

    if (res.acknowledged) {
        addClass([emailAlert], "hidden");
        removeClass([regEmail], "error");
        console.log("reg user succesfull");
        loadPage();
    } else if (res.customError) {
        //! If email is not unique
        removeClass([emailAlert], "hidden");
        addClass([regEmail], "error");
    } else {
        addClass([emailAlert], "hidden");
        removeClass([regEmail], "error");
        //todo! Somethign went wrong - display error
    }
};
