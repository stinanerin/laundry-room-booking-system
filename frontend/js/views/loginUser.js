import AbstractView from "./AbstractView.js";
import { displayAlert } from "../components/alert.js";
import { navigateTo } from "../router.js";

import { addData } from "../api.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");
    }
    async getHtml() {
        return `
            <div class="form-wrapper">
                    <form class="container main" id="loginForm">
                        <h2 class="form-heading">Welcome back</h2>
                        <div class="row gy-3 ">
                            <!-- EMAIL -->
                            <div class="form-group">
                                <label for="loginEmail" class="form-label">Email address</label>
                                <input class="form-control input" id="loginEmail" type="email" placeholder="Enter email" required/>
                            </div>
                            <!--! ALERT -->
                            <div id="loginAlert"></div>
                            <!-- PWD -->
                            <div class="form-group">
                                <label for="loginPWD" class="form-label">Password</label>
                                <input class="form-control input" id="loginPWD" type="password" placeholder="Enter password" required/>
                            </div>
                            <!-- <p class="text-end">Forgot password?</p> -->
                        </div>
                        <!-- SUBMIT -->
                        <div class="d-flex justify-content-center my-5">
                            <button class="button primary-btn" type="submit">Log in</button>
                        </div>
                    </form>
                    <!-- LINK REGISTER FORM  -->
                    <div class="text-center pb-5">
                        <p>Don't have an account? <a class="link" data-link href="/register" >Register now</a></p>
                    </div>
                </div>`;
    }
    addEventListeners() {
        document
            .querySelector("#loginForm")
            .addEventListener("submit", (e) => this.loginUser(e));
    }
    async loginUser(e) {
        e.preventDefault();
        
        const loginAlert = document.querySelector("#loginAlert");
        const email = document.querySelector("#loginEmail");
        const password = document.querySelector("#loginPWD");

        const user = {
            loginEmail: email.value,
            loginPass: password.value,
        };

        try {
            const res = await addData("user/login", user);

            if (res.acknowledged) {
                console.log("user logged in");
                navigateTo("/calendar");
            } else if (res.customError) {
                console.log("email / pwd do not match");
                displayAlert(loginAlert, res.error);
            } else {
                console.log("login failed");
                throw new Error(res.error);
            }
        } catch (error) {
            // Handle any network or server errors
            console.error("Login error:", error);
            //todo display modal
        }
    }
}