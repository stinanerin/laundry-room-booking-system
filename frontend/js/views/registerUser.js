import AbstractView from "./AbstractView.js";
import { displayAlert } from "../components/alert.js";
import { navigateTo } from "../router.js";
import { validatePWD } from "../helper.js";

import { addData } from "../api.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Register");
    }
    async getHtml() {
        return `
            <!--! REGISTER FORM -->
                <div class="form-wrapper">
                    <form class="container main" id="registerUser">
                        <h2 class="form-heading">Create an account</h2>
                        <div class="row gy-3">

                            <!-- NAME -->
                            <div class="form-group">
                                <label for="FullName" class="form-label">Full name</label>
                                <input class="form-control input" id="FullName" type="text" placeholder="Enter full name" required/>
                            </div>

                            <div></div>

                            <!-- EMAIL -->
                            <div class="form-group">
                                <label for="email" class="form-label">Email address</label>
                                <input class="form-control input " id="email" type="email" placeholder="Enter email" required/>
                            </div>

                            <!-- ALERT EMAIL -->
                            <div id="emailAlert" ></div>

                            <!-- PWD -->
                            <div class="form-group">
                                <label for="pwd" class="form-label">Password</label>
                                <input class="form-control input" id="pwd" type="password" placeholder="Enter password" required/>
                                <div class="form-text">Your password needs to be 6 characters long.</div>
                            </div>

                            <!-- SUBMIT -->
                            <div class="d-flex justify-content-center my-5">
                                <button class="button primary-btn" type="submit">Sign up</button>
                            </div>

                        </div>
                    </form>

                     <!-- LINK LOGIN -->
                     <div class="text-center pb-5">
                        <p>Already registered? <a class="link" data-link href="/">Log in here</a></p>
                    </div>
                </div>`;
    }
    addEventListeners() {
        // ----------------------- REG. USER ACC. FORM -----------------------
        document
            .querySelector("#registerUser")
            .addEventListener("submit", (e) => this.registerUser(e));
        // ----------------------- PWD INPUT VALIDATION -----------------------
        document.querySelector("#pwd").addEventListener("input", (e) => {
            validatePWD(e.target);
        });
    }
    async registerUser(e) {
        e.preventDefault();
        //? move
       const emailAlert = document.querySelector("#emailAlert");
       const fullName = document.querySelector("#FullName");
       const regEmail = document.querySelector("#email");
       const pwd = document.querySelector("#pwd");

        const user = {
            regName: fullName.value,
            regEmail: regEmail.value,
            regPass: pwd.value,
        };

        try {
            // Creates user in API
            const res = await addData("user/register", user);
    
            if (res.acknowledged) {
                console.log("user registered");
                navigateTo("/calendar");
            } else if (res.customError) {
                console.log("email already exists");
                displayAlert(emailAlert, res.error);
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
