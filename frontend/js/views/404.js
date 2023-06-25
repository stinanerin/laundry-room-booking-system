import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("404 - Page not found");
    }
    async getHtml() {
        return `
            <h2>Oops...</h2>
            <p>404 - Page not found</p>
            <a href="/" class="button primary-btn" data-link >
                <i class="fas fa-arrow-left"></i> 
                To home page
            </a>
        `;
    }
}
