

const displayUserIcons = (user) => {
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
