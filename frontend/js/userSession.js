import { fetchData } from "./api.js";
import { logout } from "./logout.js";
import { renderMonthCal } from "./calendar.js";
import { welcomeMsg } from "./userBooking.js";
import { clearElem, toUpperCaseStr, addClass, removeClass } from "./helper.js";

import { registerContainer } from "./variables.js";

const calenderWrapper = document.querySelector("#calenderWrapper");
const userIcons = document.querySelector("#userIcons");

// ----------------------- CHECK ONGOING USER SESSION -----------------------
const checkAuthentication = async () => {
    try {
        const res = await fetchData("user/active");
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const loadPage = async () => {
    const isAuthUser = await checkAuthentication();
    // console.log("isAuth", isAuthUser);
    if (isAuthUser.acknowledged) {
        addClass([ registerContainer], "hidden");
        removeClass([calenderWrapper], "hidden");
        displayUserIcons(isAuthUser);
        renderMonthCal();
    } else {
        clearElem([userIcons]);
    }
};

const displayUserIcons = (user) => {
    userIcons.innerHTML = ` 
    <div class="d-flex align-items-center ">
        <p class="m-0 p-sm-2 text-center" id="userName"><b>${
            toUpperCaseStr(user.user).split(" ")[0]
        }</b></p>
        <button id="prfPageBtn" class="btn border-0" aria-label="Account page button">
            <i class="fa-regular fa-user"></i>
        </button>
    </div>
    <div id="logoutWrapper" >
        <button id="logoutBtn" class="btn border-0" aria-label="Log out button">
            <img class="logout" src="assets/icons/logout.svg"  aria-hidden="true" alt=""/>
        </button>
    </div>`;

    document
        .querySelector("#prfPageBtn")
        .addEventListener("click", () => renderAccountPage(user));

    document.querySelector("#logoutBtn").addEventListener("click", logout);
};

const renderAccountPage = async (user) => {
    addClass([calenderWrapper], "hidden");

    // Finds the signed in user's booking from the api bookings
    const booking = await fetchData("user/booking");

    welcomeMsg(booking.booking, user);
};
