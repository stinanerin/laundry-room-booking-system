import { fetchData } from "./api.js"

// ----------------------- CHECK ONGOING USER SESSION -----------------------
export const checkAuthentication = async () => {
    try {
        const res = await fetchData("user/active");
        return res;
    } catch (error) {
        console.log(error);
    }
};
