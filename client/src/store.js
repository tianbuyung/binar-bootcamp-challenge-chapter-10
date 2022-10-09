import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/authSlice";
import logger from "redux-logger";

export default configureStore({
	reducer: {
		counter: counterReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logger),
});
