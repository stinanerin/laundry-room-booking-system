
export const displayAlert = (container, error) => {
    container.innerHTML = ` 
    <div class="alert alert-danger container" role="alert">
        <div class="row">
            <div class="col-auto">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div class="col">
                <span> ${error}</span>
            </div>
        </div>
    </div>`
};
