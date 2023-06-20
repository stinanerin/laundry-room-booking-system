export const createElement = (type, aClass, str, arr) => {
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
export const diasableElem = (arr) => {
    document.querySelectorAll("input[type='radio'][name='time-slot']")
    .forEach(radio => {
        arr.includes(+radio.value) ? radio.disabled = true : "";
    })
}

export const toggleClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.toggle(aClass))
}

export const addClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.add(aClass))
}

export const removeClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.remove(aClass))
}

export const clearElem = (arr) => {
    arr.forEach(elem => elem.innerHTML = "")
}

export const clearValue = (arr) => {
    arr.forEach(elem => elem.value = "")
}

export const toUpperCaseStr = (str) => str.split(" ")
    .map(word => {
        return word[0].toUpperCase() + word.slice(1)
    }).join(" ")

export const dateToText = (dateStr) => {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(new Date(dateStr));
}

// ----------------------- ERROR MESSAGE BOX FORMS -----------------------
export const displayError = (wrapper, message) => {
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