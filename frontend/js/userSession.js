

const renderAccountPage = async (user) => {

    // Finds the signed in user's booking from the api bookings
    const booking = await fetchData("user/booking");

    welcomeMsg(booking.booking, user);
};

export const welcomeMsg = (booking, userObj) => {
    const userBooking = booking?.date;

    document.querySelector("#welcomeMsg").innerHTML = `
        <p>Welcome back <b>${toUpperCaseStr(userObj.user)}</b>!</p>
        <div id="usersBookingInfo">
            ${
                userBooking
                    ? " <p>Your next laundry time is <b>" +
                      dateToText(userBooking) +
                      "</b></p>" +
                      "<p>Do you want to book another time? Cancel your scheduled time below first.</p>"
                    : " <p>You have no booked laundry times"
            }</p>
        </div>
        ${
            userBooking
                ? `<button  id="delBookingBtn" class="button danger-btn" >Cancel</button>`
                : ""
        }`;

    document.querySelector("#delBookingBtn").addEventListener("click", (e) => {
        delBooking(e.target, booking._id);
    });
};