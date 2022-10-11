import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/AuthService";

const authservice = new AuthService();

export const cekUser = createAsyncThunk("users/verify", async () => {
	return await authservice.verifyUser();
});

export const cekAdmin = createAsyncThunk("admin/verify", async () => {
	return await authservice.verifyAdmin();
});

export const logoutAdmin = createAsyncThunk("admin/logout", async () => {
	const cekData = await authservice.logoutAdmin();
	const res = await cekData.json();
	return { cekData, res };
});

export const logoutUser = createAsyncThunk("users/logout", async () => {
	const cekData = await authservice.logoutAdmin();
	const res = await cekData.json();
	return { cekData, res };
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAdmin: false,
		isUser: false,
		isLoading: true,
		response: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(cekUser.pending, (state, action) => {
				state.isUser = false;
				state.isLoading = true;
			})
			.addCase(cekUser.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.status === 403) {
					state.isUser = false;
				} else {
					state.isUser = true;
				}
			})
			.addCase(cekUser.rejected, (state, action) => {
				state.isUser = false;
				state.isLoading = true;
			})

			// ! logout User
			.addCase(logoutUser.pending, (state, action) => {
				state.isUser = true;
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				const payload = action.payload;
				const message = payload.res.messages;
				state.isLoading = false;

				if (payload.cekData.status === 403) {
					state.isUser = true;
					state.response = message;
				} else {
					state.isUser = false;
					state.response = message;
				}
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.isUser = true;
				state.isLoading = true;
			})

			// ! cekAdmin
			.addCase(cekAdmin.pending, (state, action) => {
				state.isAdmin = false;
				state.isLoading = true;
			})
			.addCase(cekAdmin.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.status === 403) {
					state.isAdmin = false;
				} else {
					state.isAdmin = true;
				}
			})
			.addCase(cekAdmin.rejected, (state, action) => {
				state.isAdmin = false;
				state.isLoading = true;
			})

			// ! logout Admin
			.addCase(logoutAdmin.pending, (state, action) => {
				state.isAdmin = true;
				state.isLoading = true;
			})
			.addCase(logoutAdmin.fulfilled, (state, action) => {
				const payload = action.payload;
				const message = payload.res.messages;
				state.isLoading = false;

				if (payload.cekData.status === 403) {
					state.isAdmin = true;
					state.response = message;
				} else {
					state.isAdmin = false;
					state.response = message;
				}
			})
			.addCase(logoutAdmin.rejected, (state, action) => {
				state.isAdmin = true;
				state.isLoading = true;
			});
	},
});

// export const { user, cekAdmin } = authSlice.actions;

export default authSlice.reducer;
