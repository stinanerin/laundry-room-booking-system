/**
Class representing a view
@class
*/
export default class {
    constructor() {
        // handles params
    }
    // Sets the title of the view
    setTitle(title) {
        document.title = title;
    }
    /**
    Asynchronous function that gets the HTML for a view
    @returns {Promise<string>} - The HTML for the view
    */
    async getHtml() {
        return "";
    }
}
