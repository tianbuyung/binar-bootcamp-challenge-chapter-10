const useAuth = () => {
	const isLogin = async () => {
		const res = await fetch("/users/verify", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
		});

		if (res.status === 200) {
			return isLogin;
		} else if (res.status === 403) {
			return false;
		}
	};
	return {
		isLogin,
	};
};

export default useAuth;
