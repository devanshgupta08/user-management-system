import { store } from "../store/store";
import { login } from "../store/authSlice";
import { allUsers as fetchPaginatedUsers } from "../api/users";

export const setUser = async (email) => {
    if (!email) {
        throw new Error("No email provided.");
    }

    let user = null;
    let page = 1;
    let totalPages = 1;

    
    do {
        const response = await fetchPaginatedUsers(page);
        const users = response.data.data;
        user = users.find((u) => u.email === email);
        totalPages = response.data.total_pages;
        page++;
    } while (!user && page <= totalPages);

    if (user) {

        store.dispatch(
            login({
                user,
                token: store.getState().auth.token, 
                id: user.id,
                status: true,
            })
        );
        console.log("User found and dispatched:", user);
        return user;
    } else {
        throw new Error("User not found.");
    }
};