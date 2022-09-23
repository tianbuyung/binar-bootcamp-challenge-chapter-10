const useAuth = () => {
	const isLogin = () => {
		const token = document.cookie;
		return token;
	};
	return {
		isLogin,
	};
};

export default useAuth;
