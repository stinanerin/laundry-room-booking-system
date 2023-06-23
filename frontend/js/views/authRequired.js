import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login Required");
    }
    async getHtml() {
        return `
            <h2>Login Required</h2>
            <p>Please login to access laundry booking system.</p>
            <div><a href="/frontend/" class="button primary-btn" data-link>Login</a></div>
        `;
    }
}
