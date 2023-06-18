const userIcons = document.querySelector("#userIcons")

// ----------------------- CHECK ONGOING USER SESSION -----------------------
const checkAuthentication = async () => {
     try {
        const res = await fetchData("user/active");
        return res;
     } catch (error) {
         console.log(error);
     }
};

const loadPage = async() => {
    const isAuthUser = await checkAuthentication();
    console.log("isAuth", isAuthUser);
    if (isAuthUser.acknowledged) {
        addClass([loginContainer, registerContainer], "hidden");
        removeClass([calender], "hidden");
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
        <button onclick="logout()" class="btn border-0" aria-label="Log out button">
            <img class="logout" src="assets/icons/logout.svg"  aria-hidden="true" alt=""/>
        </button>
    </div>`;
    
    document
        .querySelector("#prfPageBtn")
        .addEventListener("click", () => renderAccountPage(user));

}

const renderAccountPage = async(user) => {
    addClass([calender], "hidden")

    // Finds the signed in user's booking from the api bookings
    const booking = await fetchData("user/booking");
    const userBooking = booking.booking.date

    welcomeMsg(userBooking, user);
};