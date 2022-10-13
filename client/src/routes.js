import HomePage from "./screens/home";
import ProductDetailPage from "./screens/product-detail";
import ProfilePage from "./screens/profile";
import LoginUser from "./screens/login/LoginUser";
import LoginAdmin from "./screens/login-admin";
import RegisterPage from "./screens/register";
import Admin from "./screens/admin";
import CartPage from "./screens/cart";
import OrderPage from "./screens/order";
import ProductListPage from "./screens/product-list";
import { useAuth, useAuthAdmin } from "./hooks/useAuth";

import { useRouter } from "next/router";
const router = useRouter();

const ProtectedRouteNonAuth = ({ children }) => {
	const isUser = useAuth();

	if (isUser === true) {
		router.replace("/profile");
	}
	return children;
};

const ProtectedRouteAuth = ({ children }) => {
	const isUser = useAuth();

	if (isUser === false) {
		router.replace("/login");
	}
	return children;
};

const ProtectedRouteAdmin = ({ children }) => {
	const isAdmin = useAuthAdmin();

	if (isAdmin === false) {
		router.replace("/admin/login");
	}
	return children;
};

const ProtectedRouteNonAuthAdmin = ({ children }) => {
	const isAdmin = useAuthAdmin();

	if (isAdmin === true) {
		router.replace("/admin");
	}

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
