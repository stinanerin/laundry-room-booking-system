// ----------------------- LOG OUT -----------------------

const logout = async() => {
    await addData("user/logout")
    location.reload();
}
