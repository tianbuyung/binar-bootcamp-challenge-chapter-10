import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	cekUser,
	cekAdmin,
	logoutAdmin,
	// logoutUser,
} from "../features/authSlice";

const useAuth = () => {
	const dispatch = useDispatch();
	const isUser = useSelector((state) => {
		return state.auth;
	});

	useEffect(() => {
		if (isUser.isLoading === true) {
			dispatch(cekUser());
		}
	}, [isUser]);

	return isUser.isUser;
};

const useAuthAdmin = () => {
	const dispatch = useDispatch();
	const isAdmin = useSelector((state) => {
		return state.auth;
	});

	useEffect(() => {
		if (isAdmin.isLoading === true) {
			dispatch(cekAdmin());
		}
	}, [isAdmin]);

	return isAdmin.isAdmin;
};

// const useLogout = () => {
// 	const dispatch = useDispatch();
// 	const isUser = useSelector((state) => {
// 		return state.auth;
// 	});

// 	useEffect(() => {
// 		if (isUser.isLoading === true) {
// 			dispatch(logoutUser());
// 		}
// 	}, [isUser]);

// 	return isUser;
// };

const useLogoutAdmin = () => {
	const dispatch = useDispatch();
	const isAdmin = useSelector((state) => {
		return state.auth;
	});

	useEffect(() => {
		if (isAdmin.isLoading === true) {
			dispatch(logoutAdmin());
		}
	}, [isAdmin]);

	return isAdmin;
};

export { useAuth, useAuthAdmin, useLogoutAdmin };
