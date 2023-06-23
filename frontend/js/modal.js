const modal = document.querySelector("#modal");

export const displayModal = (error) => {
    modal.querySelector("p").innerText = "Error: " + error;
    modal.showModal()
}
