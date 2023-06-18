const welcomeMsg = (booking, userObj) => {
    const userBooking = booking?.date;

    const div = document.querySelector("#welcomeMsg");
    div.innerHTML = `
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
                ? `<button  onclick="delBooking(this, '${booking._id}')" class="button danger-btn" >Cancel</button>`
                : ""
        }`;
};

const delBooking = async(btn, id) => {

    const res = await deleteData(`bookings/${id}`);

    if(res.data.acknowledged) {
        /* If deletion of booking is ok, set local storage userHasBokking variable to false
        as to not disable booking-form submit btns again and update DOM accordingly */
        
        btn.innerText = "Cancelled";
        btn.disabled = true;
        addClass([btn], "no-hover");
        document.querySelector(
            "#usersBookingInfo"
        ).innerHTML = `<p>Booking succesfully deleted</p>`;
    }
}
