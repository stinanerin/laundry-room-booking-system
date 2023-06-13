// ----------------------- LOGIN -----------------------
const loginForm = document.querySelector("#loginForm"),
    loginError = document.querySelector("#loginAlert"),
    email = document.querySelector("#loginEmail"),
    password = document.querySelector("#loginPWD");


loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    login()
})

const login = async() => {

    const user = {
        loginName: email.value,
        loginPass: password.value,
    };

    const res = await addData("user/login", user);
    console.log(res);
    if (res.acknowledged) {

        console.log("user logged in");
        clearElem([loginError]);
        loadPage();

    } else if(res.customError){
        console.log("email / pwd do not match");
        displayError(loginError, res.error);

    } else {
        console.log("login failed");
        //todo! Somethign went wrong - display error
    }
}

