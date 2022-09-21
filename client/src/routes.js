import { Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product-detail";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginUser from "./pages/login/LoginUser";
import LoginAdmin from "./pages/login-admin/LoginAdmin";
import RegisterPage from "./pages/register/RegisterPage";

const ProtectedRouteNonAuth = ({ children }) => {
	const token = document.cookie;
	if (token) {
		return <Navigate to="/" replace />;
	}
	return children;
};
const ProtectedRouteAuth = ({ children }) => {
	const token = document.cookie;
	if (!token) {
		return <Navigate to="/login" replace />;
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
			<ProtectedRouteAuth>
				<LoginAdmin />
			</ProtectedRouteAuth>
		),
	},
	// {
	// 	path: "admin/logout",
	// 	page: (
	// 		<ProtectedRouteNonAuth>
	// 			<LoginAdmin />
	// 		</ProtectedRouteNonAuth>
	// 	),
	// },
	// {
	// 	path: "user/logout",
	// 	page: (
	// 		<ProtectedRouteNonAuth>
	// 			<LoginUser />
	// 		</ProtectedRouteNonAuth>
	// 	),
	// },
];

export default routes;
