// ----------------------- LOG OUT -----------------------

const logout = () => {
    localStorage.removeItem("user");
    location.reload();
}

