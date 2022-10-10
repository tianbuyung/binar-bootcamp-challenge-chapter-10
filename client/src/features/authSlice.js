import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/AuthService";

const authservice = new AuthService();

export const cekUser = createAsyncThunk("users/verify", async () => {
	return await authservice.verifyUser();
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		// isLogin: false,
		isAdmin: false,
		isUser: false,
		isLoading: true,
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
		builder
			.addCase(cekUser.pending, (state, action) => {
				state.isUser = false;
				state.isLoading = true;
			})
			.addCase(cekUser.fulfilled, (state, action) => {
				if (action.payload.status === 403) {
					state.isUser = false;
					state.isLoading = false;
				} else {
					state.isUser = true;
				}
			})
			.addCase(cekUser.rejected, (state, action) => {
				state.isUser = false;
				state.isLoading = false;
			});
	},
});

// export const { user, cekAdmin } = authSlice.actions;

export default authSlice.reducer;
