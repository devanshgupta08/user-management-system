import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,       
		token: null,     
		status: false,
		id: null    
	},
	reducers: {
		login: (state, action) => {
			const { token, user,id } = action.payload;
			state.token = token;
			state.user = user || null;
			state.status = true; 
			state.id = id || null;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.status = false;
			state.id = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
