import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authSlice";
import logger from "redux-logger";

export default configureStore({
	reducer: {
		users: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logger),
});
