import { Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product-detail";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Admin from "./pages/admin";

const ProtectedRouteNonAuth = ({ children }) => {
	const token = document.cookie;
	if (token) {
		console.log("cek token = ", token);
		return <Navigate to="/" replace />;
	}
	return children;
};
const ProtectedRouteAuth = ({ children }) => {
	const token = document.cookie;
	if (!token) {
		console.log("cek token = ", token);
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
		path: "auth/login",
		page: (
			<ProtectedRouteNonAuth>
				<LoginPage />
			</ProtectedRouteNonAuth>
		),
	},
	{
		path: "auth/register",
		page: (
			<ProtectedRouteNonAuth>
				<RegisterPage />
			</ProtectedRouteNonAuth>
		),
	},
	{
		path: "/admin",
		page: <Admin />,
	},
];

export default routes;
