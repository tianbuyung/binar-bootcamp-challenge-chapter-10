import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import AuthService from "../services/AuthService";

const authservice = new AuthService();

export const cekUser = createAsyncThunk("users/verify", async () => {
	return await authservice.verifyUser();
});

const authSlice = createSlice({
	name: "cekLogin",
	initialState: {
		// isLogin: false,
		isAdmin: false,
		isUser: false,
	},
	// ! coba dulu
	// reducers: {
	// 	cekUser: (state) => {
	// 		if (state.isUser === false) {
	// 			state.isUser = true;
	// 		}
	// 	},
	// },
	// cekAdmin: async (state) => {
	// const verify = await authservice.verifyAdmin();
	// if (verify.status === 200) {
	// 	state.isAdmin = true;
	// }
	// },
	// logoutAdmin: async (state) => {
	// 	const cekLogout = await authservice.logoutAdmin();
	// 	if (cekLogout.status === 200) {
	// 		state.isAdmin = false;
	// 	}
	// },
	// logoutUser: async (state) => {
	// 	const cekLogout = await authservice.logoutUser();
	// 	if (cekLogout.status === 200) {
	// 		state.isUser = false;
	// 	}
	// }
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(cekUser.fulfilled, (state, action) => {
			if (action.payload.status === 403) {
				state.isUser = true;
			} else {
				state.isUser = true;
			}
		});
	},
});

// export const { user, cekAdmin } = authSlice.actions;

export default authSlice.reducer;
