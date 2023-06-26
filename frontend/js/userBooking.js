import { dateToText, addClass } from "./helper.js";
import { deleteData, addData } from "./api.js";

export const delBooking = async (btn, id) => {
    const res = await deleteData(`bookings/${id}`);
    console.log(res);

    if (res.acknowledged) {
        /* If deletion of booking is ok, set local storage userHasBokking variable to false
        as to not disable booking-form submit btns again and update DOM accordingly */
        btn.innerText = "Cancelled";
        btn.disabled = true;
        addClass([btn], "no-hover");
        document.querySelector(
            "#usersBookingInfo"
        ).innerHTML = `<p>Booking succesfully deleted</p>`;
    }
};

export const addBooking = async (form, choosenDate) => {
    console.log("choosenDate", choosenDate);
    const res = await addData("bookings", { date: choosenDate });

    if (res.acknowledged) {
        const radioBtn = form.querySelector("input[type='radio']:checked");
        // If booking is added correctly update DOM accordingly
        addClass([radioBtn], "active-user");
        radioBtn.disabled = true;
        form.querySelector("button[type='submit']").disabled = true;
        form.querySelector("button[type='submit']").innerText = "Booked";
        dayView.querySelector(
            "p"
        ).innerHTML = `Congratulations! Your booking is confirmed for <b>${dateToText(
            choosenDate
        )}</b>.`;
        // Adds purple dot on the booked cal. day
        addClass([document.querySelector("li.active")], "booked");
    }
};
