import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/AuthService";

const authservice = new AuthService();

export const cekUser = createAsyncThunk("users/verify", async () => {
	return await authservice.verifyUser();
});

export const cekAdmin = createAsyncThunk("admin/verify", async () => {
	return await authservice.verifyAdmin();
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAdmin: false,
		isUser: false,
		isLoading: true,
	},
	reducers: {
		logout: (state) => {
			state.isUser = false;
		},
		logoutAdmin: (state) => {
			state.isAdmin = false;
		},
	},
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
			});
	},
});

export const { logout, logoutAdmin } = authSlice.actions;

export default authSlice.reducer;
