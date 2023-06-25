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
            <a href="/" class="button primary-btn" data-link >Login</a>
        `;
    }
}
