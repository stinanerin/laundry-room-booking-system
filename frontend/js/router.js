import { checkAuthentication } from "./checkAuth.js";
import { logout } from "./logout.js";

import loginUser from "./views/loginUser.js";
import calendar from "./views/calendar.js";
import authReq from "./views/authRequired.js";
import registerUser from "./views/registerUser.js";

import { app } from "./variables.js";
import { toUpperCaseStr } from "./helper.js";

// Navigates to a specific url and updates the history
export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        // { path: "/", view: home },
        {
            path: "/calendar",
            view: calendar,
            requiresAuth: true,
        },
        {
            path: "/",
            view: loginUser,
        },
        {
            path: "/register",
            view: registerUser,
        },
        
    ];

    // Test each route for potential match
    // Loops through each route and returns an object with the route and a boolean isMatch value
    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            // Does the current url location match a specified route
            isMatch: location.pathname.split("/frontend")[1] === route.path,
        };
    });
    console.log("url", location.pathname.split("/frontend")[1]);
    console.log("potentialMatches", potentialMatches);
    // Finds the route with the isMatch: true key/value pair
    let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.isMatch
    );
    console.log("match", match);

    //todo! if match is not true - 404

    // console.log("match.route.requiresAuth", match.route.requiresAuth);
    const userRes = await checkAuthentication();
    console.log(userRes);
    const checkAuth = userRes.acknowledged;

    console.log("checkAuth", checkAuth);

    if (checkAuth) {
        const userIcons = document.querySelector("#userIcons");

        userIcons.innerHTML = ` 
        <div class="d-flex align-items-center ">
            <p class="m-0 p-sm-2 text-center" id="userName"><b>${
                toUpperCaseStr(userRes.user).split(" ")[0]
            }</b></p>
            <button id="prfPageBtn" class="btn border-0" aria-label="Account page button">
                <i class="fa-regular fa-user"></i>
            </button>
        </div>
        <div id="logoutWrapper" >
            <button id="logoutBtn" class="btn border-0" aria-label="Log out button">
                <img class="logout" src="/assets/icons/logout.svg"  aria-hidden="true" alt=""/>
            </button>
        </div>`;
        //todo bryt ut?
        document.querySelector("#logoutBtn").addEventListener("click", (e) => {
            console.log("clicked");
            e.preventDefault();
            logout();
        });
    }

    if (match.route.requiresAuth && !checkAuth) {
        /* If route requires authenticated user & user is not authenticated(signed in),
        prevent user from viewing route */
        console.log("ej auth");
        match = {
            isMatch: true,
            route: {
                path: match.route.path,
                requiresAuth: true,
                view: authReq,
            },
        };
        console.log(match);
    }

    // Creates new instance of the view: importedClass - at the match route
    console.log("currentView", match.route);
    const currentView = new match.route.view();

    // Set the current views HTML as the main div:s HTML
    app.innerHTML = await currentView.getHtml();

    // If addEventListener method exists on currentView instance - invoke them
    if (currentView.addEventListeners) currentView.addEventListeners();
};

// Adds an event listener for when the user navigates using browser history buttons, and calls the router function.
window.addEventListener("popstate", router);

// Listens to DOM loads
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        // If the link have the [data-link] attribute
        if (e.target.matches("[data-link]")) {
            // Prevent following the link and site refresh
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});
