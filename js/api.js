const API_BASE_URL = "https://express-booking-system-backend.herokuapp.com/api/v.1/";

const fetchData = async (route) => {
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
};

//todo! fix according to new databse
const deletePassedBookings = async (arr) => {
    const res = arr.map((bookingObj) =>
        /* If date in bookingsArr has passed, relative to todays date - delete it from bookings API.
        Otherwise just return the booking object */
        hasDatePassed(new Date(bookingObj.booking), today)
            ? deleteBooking(currentList, bookingObj)
            : bookingObj
    );
    /* Await all deleted pending bookings promises */
    newBookingsArr = await Promise.all(res);
    newBookingsArr.forEach((booking) => {
        /* If a booking has beeen succesfully deleted from api (res.ok),
        extract the deleted bookings id from the response url and delete it from the original arr, 
        finding it by its booking.id. */
        if (booking.ok) {
            const idDelBooking = booking.url.split("items/")[1];
            arr.splice(
                arr.indexOf(
                    arr.find((booking) => booking._id === idDelBooking)
                ),
                1
            )
        }
    })
    /* Returns arr - regardless of if it has been modified or not */
    return arr
}

const deleteData = async(route) => {
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

const addData = async (route, data) => {
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
