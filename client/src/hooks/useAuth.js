import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cekUser, cekAdmin } from "../features/authSlice";

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

export { useAuth, useAuthAdmin };
