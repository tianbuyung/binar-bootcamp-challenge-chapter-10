import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product-detail";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginUser from "./pages/login/LoginUser";
import LoginAdmin from "./pages/login-admin/LoginAdmin";
import RegisterPage from "./pages/register/RegisterPage";
import Admin from "./pages/admin";
import CartPage from "./pages/cart/CartPage";
import OrderPage from "./pages/order/OrderPage";
import Test from "./pages/test";

import { useNavigate } from "react-router-dom";

const ProtectedRouteNonAuth = ({ children }) => {
	const navigate = useNavigate();
	const cekUser = async () => {
		const res = await fetch("/users/verify", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
		});

		if (res.status === 200) {
			alert("Anda sudah login!");
			navigate("/", { replace: true });
		} else if (res.status === 403) {
			return children;
		}
	};

	cekUser();
	return children;
};

const ProtectedRouteAuth = ({ children }) => {
	const navigate = useNavigate();
	const cekUser = async () => {
		const res = await fetch("/users/verify", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
		});

		if (res.status === 200) {
			return children;
		} else if (res.status === 403) {
			alert("Anda harus login!");
			navigate("/login", { replace: true });
		}
	};
	cekUser();

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
		path: "admin",
		page: (
			<ProtectedRouteNonAuth>
				<LoginAdmin />
			</ProtectedRouteNonAuth>
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
			// <ProtectedRouteAuth>
			<Admin />
			// </ProtectedRouteAuth >
		),
	},
	{
		path: "/test",
		page: <Test />,
	},
];

export default routes;
