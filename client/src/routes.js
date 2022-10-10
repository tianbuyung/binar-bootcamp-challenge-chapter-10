import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product-detail";
import ProfilePage from "./pages/profile";
import LoginUser from "./pages/login/LoginUser";
import LoginAdmin from "./pages/login-admin";
import RegisterPage from "./pages/register";
import Admin from "./pages/admin";
import CartPage from "./pages/cart";
import OrderPage from "./pages/order";
import ProductListPage from "./pages/product-list";
import AuthService from "./services/AuthService";
// import { cekUser, cekAdmin } from "./features/authSlice";
import { cekUser } from "./features/authSlice";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const authservice = new AuthService();
const ProtectedRouteNonAuth = ({ children }) => {
	const navigate = useNavigate();
	// useEffect(() => {
	// 	const cekUser = async () => {
	// 		const verify = await authservice.verifyUser();

	// 		if (verify.status === 200) {
	// 			navigate("/", { replace: true });
	// 		}
	// 	};
	// 	cekUser();
	// });

	const dispatch = useDispatch();
	const isUser = useSelector((state) => state.users);
	useEffect(() => {
		dispatch(cekUser());
		console.log("cek data = ", isUser);
	}, []);
	return children;
};

const ProtectedRouteAuth = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const cekUser = async () => {
			const verify = await authservice.verifyUser();

			if (verify.status === 403) {
				navigate("/", { replace: true });
			}
		};
		cekUser();
	});

	return children;
};

// ! Error
const ProtectedRouteAdmin = ({ children }) => {
	const navigate = useNavigate();
	useEffect(() => {
		const cekAdmin = async () => {
			const verify = await authservice.verifyAdmin();

			if (verify.status === 403) {
				navigate("/admin/login", { replace: true });
			}
		};

		cekAdmin();
	});
	return children;
};

const ProtectedRouteNonAuthAdmin = ({ children }) => {
	const navigate = useNavigate();
	useEffect(() => {
		const cekUser = async () => {
			const verify = await authservice.verifyAdmin();

			if (verify.status === 200) {
				navigate("/admin", { replace: true });
			}
		};

		cekUser();
	});

	return children;
};
const routes = [
	{
		path: "/",
		page: <HomePage />,
	},
	{
		path: "product/:product_id",
		page: <ProductDetailPage />,
	},
	{
		path: "product/category/:categoryId",
		page: <ProductListPage />,
	},
	{
		path: "profile",
		page: (
			<ProtectedRouteAuth>
				<ProfilePage />
			</ProtectedRouteAuth>
		),
	},
	{
		path: "login",
		page: (
			<ProtectedRouteNonAuth>
				<LoginUser />
			</ProtectedRouteNonAuth>
		),
	},
	{
		path: "register",
		page: (
			<ProtectedRouteNonAuth>
				<RegisterPage />
			</ProtectedRouteNonAuth>
		),
	},
	{
		path: "admin/login",
		page: (
			<ProtectedRouteNonAuthAdmin>
				<LoginAdmin />
			</ProtectedRouteNonAuthAdmin>
		),
	},
	{
		path: "/cart",
		page: (
			<ProtectedRouteAuth>
				<CartPage />
			</ProtectedRouteAuth>
		),
	},
	{
		path: "/order/:orderId",
		page: (
			<ProtectedRouteAuth>
				<OrderPage />
			</ProtectedRouteAuth>
		),
	},
	{
		path: "/admin",
		page: (
			<ProtectedRouteAdmin>
				<Admin />
			</ProtectedRouteAdmin>
		),
	},
	// {
	// 	path: "/test",
	// 	page: <Test />,
	// },
];

export default routes;
