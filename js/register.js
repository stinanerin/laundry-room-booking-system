const loginUserLink = document.querySelector("#loginLink"),
    loginContainer = document.querySelector("#loginWrapper"),
    registerUserLink = document.querySelector("#registerLink"),
    registerContainer = document.querySelector("#registerWrapper"),
    registerUserForm = document.querySelector("#registerUser"),
    calender = document.querySelector("#calenderWrapper"),
    emailAlert = document.querySelector("#emailAlert"),
    fullName = document.querySelector("#FullName"),
    regEmail = document.querySelector("#email"),
    pwd = document.querySelector("#pwd");

// ----------------------- REGISTER USER FORM -----------------------
registerUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    validateUserRegistration(fullName.value, regEmail.value, pwd.value);
});

// ----------------------- VALIDATION - REGISTER USER -----------------------
const validateUserRegistration = async (name, email, password) => {
    // const checkUniqueEmail = (user) => user.email !== email;

    // Creates user in API
    const res = await addData("user/register", {
        regName: email,
        regPass: password,
    });
    console.log(res);

    if (res.acknowledged) {
        addClass([emailAlert], "hidden");
        removeClass([regEmail], "error");
        console.log("reg user succesfull");
        loadPage()
    } else if (res.customError) {
        //! If email is not unique
        removeClass([emailAlert], "hidden");
        addClass([regEmail], "error");
    } else {
        addClass([emailAlert], "hidden");
        removeClass([regEmail], "error");

        //todo! Somethign went wrong - display error
    }
};
