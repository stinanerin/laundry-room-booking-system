import { displayModal } from "./modal.js";

const API_BASE_URL = "https://express-booking-system-backend.herokuapp.com/api/v.1/";

export const fetchData = async (route) => {
    try {
        const res = await axios.get(`${API_BASE_URL}${route}`, {
            withCredentials: true,
        });

        // console.log("fetchData res", res);
        if (res.status !== 200) {
            console.log(res.response.statusText);
            throw new Error(res.statusText);
        }
        return res.data;
    } catch (error) {
        console.log(error);
        // displayModal(error.message);
        return error.response.data;
    }
}

export const deleteData = async(route) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}${route}`, {
            withCredentials: true,
        });
        if (res.status !== 200) {
            console.log(res.response.statusText);
            throw new Error(res.statusText);
        }
        console.log("deleteData res", res);

        return res
    } catch (error) {
        console.log(error)
        displayModal(error.message)
    }
}

export const addData = async (route, data) => {
    try {
        const res = await axios.post(`${API_BASE_URL}${route}`, data, {
            withCredentials: true,
        });
        if (res.status !== 200) {
            console.log(res.response.statusText);
            throw new Error(res.response.statusText);
        }
        console.log("addData res", res);
        return res.data;
    } catch (error) {
        console.error(error);
        if (error.response) {
            return error.response.data;
        }
        return error.message;
    }
};
