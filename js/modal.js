
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {
  modal.close();
});

const displayModal = (error) => {
    modal.querySelector("p").innerText = "Error: " + error;
    modal.showModal()
}