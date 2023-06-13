const API_BASE_URL = "https://express-booking-system-backend.herokuapp.com/api/v.1/";
// const API_BASE_URL = "https://nackademin-item-tracker.herokuapp.com/"

const fetchData = async (route) => {
    try {
        const res = await axios.get(`${API_BASE_URL}${route}`, {
            withCredentials: true,
        });

        console.log(res);
        if (!res.ok) {
            console.log(res.response.statusText);
            throw new Error(res.statusText);
        }
        // const data = await res.json();
        // let arr = data.itemList;
        // arr = await deletePassedBookings(arr);
        // let  objBooking  = arr[arr.length -1];
        // console.log("latest booking", objBooking);
        return res;
        // return arr;
    } catch (error) {
        console.log(error);
        // displayModal(error.message);
        return error.response.data;
    }
};

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
};

// ----------------------- CREATE USER IN API -----------------------
const createUser = async (name, email, pwd) => {
    try {
        //todo! Change list
        const res = await fetch(
            `${API_BASE_URL}lists/6429d84525fc8200e0300328/items`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: pwd,
                }),
            }
        );
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const { list } = await res.json();

        // Find latest registered user and adds to local storage as signed in
        const user = list.itemList[list.itemList.length - 1];
        addSession(user);
    } catch (error) {
        displayModal(error.message);
    }
};

const addBooking = async (listId, date) => {
    try {
        if (!getItem("user").hasBooking) {
            const res = await fetch(`${API_BASE_URL}lists/${listId}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    booking: date,
                    user_id: getItem("user").id,
                }),
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res;
        } else {
            throw new Error(
                "You already have a booking, please cancel it or wait until the booked day ahs passed to book a new laundry time."
            );
        }
    } catch (error) {
        displayModal(error.message);
    }
};

const deleteBooking = async (listId, item) => {
    try {
        const res = await fetch(
            `${API_BASE_URL}lists/${listId}/items/${item._id}`,
            {
                method: "DELETE",
            }
        );
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    } catch (error) {
        displayModal(error.message);
    }
};

//! New

const addData = async (route, data) => {
    try {
        const res = await axios.post(`${API_BASE_URL}${route}`, data, {
            withCredentials: true,
        });
        if (res.status !== 200) {
            console.log(res.response.statusText);
            throw new Error(res.response.statusText);
        }
        console.log(res);
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};
