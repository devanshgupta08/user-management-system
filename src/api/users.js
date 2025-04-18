import api from "./axiosConfig";

// Fetch a single user by ID
const getCurrentUser = async (id) => {
    return await api.get(`/users/${id}`);
};

// Fetch all users (paginated)
const allUsers = async (pageNo) => {
    return await api.get(`/users/?page=${pageNo}`);
};

// Login API
const login = async (data) => {
    return await api.post("/login", data);
};

// Logout API
const logout = async () => {
    return await api.post("/users/logout");
};

// Update user data
const updateUserData = async (id, data) => {
    return await api.patch(`/users/${id}`, data);
};

// Delete user
const deleteUser = async (id) => {
    return await api.delete(`/users/${id}`);
};

// Refresh token
const refreshToken = async () => {
    return await api.post("/users/generate-token");
};

// Update avatar
const updateAvatar = async (data) => {
    return await api.patch("/users/update-avatar", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Change password
const changePassword = async (data) => {
    return await api.post("/users/change-password", data);
};

// Admin-specific APIs
const adminDeleteUser = async (id) => {
    return await api.delete(`/users/admin-delete/${id}`);
};

const makeAdmin = async (id) => {
    return await api.patch(`/users/make-admin/${id}`);
};

const dismissAdmin = async (id) => {
    return await api.patch(`/users/dismiss-admin/${id}`);
};

export {
    getCurrentUser,
    allUsers,
    login,
    logout,
    updateUserData,
    deleteUser,
    refreshToken,
    updateAvatar,
    changePassword,
    adminDeleteUser,
    makeAdmin,
    dismissAdmin,
};