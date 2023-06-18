const createElement = (type, aClass, str, arr) => {
    let elem = document.createElement(type);
    if(aClass) {
        elem.className = aClass;
    }
    if(str) {
        elem.innerText = str
    }
    if(arr) {

    }
    return elem;
}

//! todo - make dynamic
const diasableElem = (arr) => {
    document.querySelectorAll("input[type='radio'][name='time-slot']")
    .forEach(radio => {
        arr.includes(+radio.value) ? radio.disabled = true : "";
    })
}

const toggleClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.toggle(aClass))
}

const addClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.add(aClass))
}

const removeClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.remove(aClass))
}

const clearElem = (arr) => {
    arr.forEach(elem => elem.innerHTML = "")
}

const clearValue = (arr) => {
    arr.forEach(elem => elem.value = "")
}

const toUpperCaseStr = (str) => str.split(" ")
    .map(word => {
        return word[0].toUpperCase() + word.slice(1)
    }).join(" ")

const dateToText = (dateStr) => {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(new Date(dateStr));
}

// ----------------------- ERROR MESSAGE BOX FORMS -----------------------
const displayError = (wrapper, message) => {
    wrapper.innerHTML = `
    <div class="alert alert-danger container" role="alert">
        <div class="row">
            <div class="col-auto">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div class="col">
                <span> ${message}</span>
            </div>
        </div>
    </div>`
}