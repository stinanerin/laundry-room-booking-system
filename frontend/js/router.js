console.log("router");

import loginUser from "./views/loginUser.js";

// Navigates to a specific url and updates the history
export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async() => {
    const routes = [
        // { path: "/", view: home },
        // {
        //     path: "/calendar",
        //     view: calendar,
        //     requiresAuth: true,
        // },
        {
            path: "/",
            view: loginUser,
        },
        // {
        //     path: "/register",
        //     view: registerUser,
        // },
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
    console.log("potentialMatches", potentialMatches);

    // Finds the route with the isMatch: true key/value pair
    let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.isMatch
    );

    //todo! if match is not true - 404

    // Creates new instance of the view: importedClass - at the match route
    const currentView = new match.route.view();
    console.log("currentView", match.route);

    // Set the current views HTML as the main div:s HTML
    document.querySelector("#app").innerHTML = await currentView.getHtml();

    // If addEventListener method exists on currentView instance - invoke them
    if (currentView.addEventListeners) currentView.addEventListeners()

}


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