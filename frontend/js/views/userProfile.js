import AbstractView from "./AbstractView.js";
import { delBooking } from "../userBooking.js";
import { fetchData } from "../api.js";
import { toUpperCaseStr, dateToText } from "../helper.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Profile page");
    }
    async getHtml(userObj) {
        const booking = await fetchData("user/booking");
        this.booking = booking;
        const userBooking = booking.booking?.date;

        return `
        <div class="text-center profile-container">
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
                    ? `<button id="delBookingBtn" class="button danger-btn" >Cancel</button>`
                    : ""
            }
        </div>`;
    }
    addEventListeners() {
        document
            .querySelector("#delBookingBtn")
            ?.addEventListener("click", (e) => {
                delBooking(e.target, this.booking.booking._id);
            });
    }
}
