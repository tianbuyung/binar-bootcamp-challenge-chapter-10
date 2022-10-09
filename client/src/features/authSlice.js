import { createSlice, AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/AuthService";

const authservice = new AuthService();

const cekUser = createAsyncThunk('users/status', async () => {
	try {
		const user = await authservice.verifyUser();
		return user;
	} catch (error) {
		console.log("error whlie verify user : ", error.message);
	}
})

const authSlice = createSlice({
	name: "cekLogin",
	initialState: {
		// isLogin: false,
		isAdmin: false,
		isUser: false,
	},
	// ! coba dulu
	reducers: {
		user: {
			const verify = cekUser;
		},
		cekAdmin: async (state) => {
			const verify = await authservice.verifyAdmin();
			if (verify.status === 200) {
				state.isAdmin = true;
			}
		},
		logoutAdmin: async (state) => {
			const cekLogout = await authservice.logoutAdmin();
			if (cekLogout.status === 200) {
				state.isAdmin = false;
			}
		},
		logoutUser: async (state) => {
			const cekLogout = await authservice.logoutUser();
			if (cekLogout.status === 200) {
				state.isUser = false;
			}
		},
	},
});

export const { user, cekAdmin } = authSlice.actions;

export default authSlice.reducer;
