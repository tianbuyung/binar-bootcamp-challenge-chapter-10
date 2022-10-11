import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cekUser, cekAdmin } from "../features/authSlice";

const useTest = () => {
	const dispatch = useDispatch();
	const isUser = useSelector((state) => {
		return state.auth;
	});

	useEffect(() => {
		if (isUser.isLoading === true) {
			dispatch(cekUser());
		}
	}, [isUser]);

	return { isUser };
};

export default useTest;
