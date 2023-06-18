const welcomeMsg = (booking, userObj) => {
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

const addBooking = async (form) => {
    const res = await addData("bookings", { date: currentDate });

    if (res.acknowledged) {
        // If booking is added correctly update DOM accordingly
        form.querySelector("input[type='radio']:checked").disabled = true;
        form.querySelector("button[type='submit']").disabled = true;
        form.querySelector("button[type='submit']").innerText = "Booked";
        dayView.querySelector(
            "p"
        ).innerHTML = `Congratulations! Your booking is confirmed for <b>${dateToText(
            currentDate
        )}</b>.`;
        // Adds purple dot on the booked cal. day
        addClass([document.querySelector("li.active")], "booked");
    }
};