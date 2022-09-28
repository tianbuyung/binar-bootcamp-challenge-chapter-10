import { useEffect, useState } from "react";

import AuthService from "../services/AuthService";

const authservice = new AuthService();
const useAuth = () => {
	const [isLogin, setIsLogin] = useState(false);
	const checkLogin = async () => {
		const res = await authservice.verifyUser();

		if (res.status === 200) {
			setIsLogin(true);
		} else if (res.status === 403) {
			return false;
		}
	};
	useEffect(() => {
		checkLogin();
	}, []);
	return {
		isLogin,
	};
};

export default useAuth;
