import { createSlice } from "@reduxjs/toolkit";

import AuthService from "./services/AuthService";

const authservice = new AuthService();
const authSlice = createSlice({
	name: "cekLogin",
	initialState: {
		isLogin: false,
		isAdmin: false,
		isUser: false,
	},
	// ! coba dulu
	reducers: {
		cekUser: async (state) => {
			const verify = await authservice.verifyUser();
			if (verify.status === 200) {
				state.isLogin = true;
				state.isUser = true;
			}
		},
		cekAdmin: async (state) => {
			const verify = await authservice.verifyAdmin();
			if (verify.status === 200) {
				state.isLogin = true;
				state.isAdmin = true;
			}
		},
	},
});

export const { cekUser, cekAdmin } = authSlice.actions;

export default authSlice.reducer;
