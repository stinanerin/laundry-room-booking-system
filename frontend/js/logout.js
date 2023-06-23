import { addData } from "./api.js";
import { navigateTo } from "./router.js";

export const logout = async () => {
    try {
        await addData("user/logout");
        navigateTo("/frontend/");
    } catch (error) {
        // Handle any network or server errors
        console.error("Log out error:", error);
        //todo modal?
    }
};

