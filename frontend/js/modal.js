const modal = document.querySelector("#modal");

document.querySelector("#closeModal").addEventListener("click", () => {
    modal.close();
});

export const displayModal = (error) => {
    modal.querySelector("p").innerText = "Error: " + error;
    modal.showModal()
}
