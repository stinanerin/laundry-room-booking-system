import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login Required");
    }
    async getHtml() {
        return `
            <h2>Login Required</h2>
            <p>Please login to access this page.</p>
            <div class="btn-wrapper"><a href="/login" class="btn" data-link>Login</a></div>
        `;
    }
}
