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

import { useNavigate } from "react-router-dom";

const ProtectedRouteNonAuth = ({ children }) => {
	const navigate = useNavigate();

	const isUser = useAuth();

	if (isUser === true) {
		navigate("/profile", { replace: true });
	}
	return children;
};

const ProtectedRouteAuth = ({ children }) => {
	const navigate = useNavigate();

	const isUser = useAuth();

	if (isUser === false) {
		navigate("/login", { replace: true });
	}
	return children;
};

const ProtectedRouteAdmin = ({ children }) => {
	const navigate = useNavigate();

	const isAdmin = useAuthAdmin();

	if (isAdmin === false) {
		navigate("/admin/login", { replace: true });
	}
	return children;
};

const ProtectedRouteNonAuthAdmin = ({ children }) => {
	const navigate = useNavigate();
	const isAdmin = useAuthAdmin();

	if (isAdmin === true) {
		navigate("/admin", { replace: true });
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
