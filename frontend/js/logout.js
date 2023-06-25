import { addData } from "./api.js";
import { navigateTo } from "./router.js";

export const logout = async () => {
    try {
        const res = await addData("user/logout");
        console.log("logout res",res);
        if (!res.loggedin) {
            navigateTo("/");
        } else {
            throw new Error()
        }
    } catch (error) {
        // Handle any network or server errors
        console.error("Log out error:", error);
        //todo modal?
    }
};

