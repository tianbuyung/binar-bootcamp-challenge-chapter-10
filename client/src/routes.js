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

	const { isUser } = useAuth();

	if (isUser === true) {
		navigate("/", { replace: true });
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
