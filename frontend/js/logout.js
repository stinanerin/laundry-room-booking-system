import { addData } from "./api.js";

export const logout = async () => {
    try {
        await addData("user/logout");
        location.reload();
    } catch (error) {
        // Handle any network or server errors
        console.error("Log out error:", error);
        //todo modal?
    }
};

