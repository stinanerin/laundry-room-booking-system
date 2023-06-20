import { addData } from "./api.js";

export const logout = async () => {
    await addData("user/logout");
    location.reload();
};
