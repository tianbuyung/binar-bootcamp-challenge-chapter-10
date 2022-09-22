import { Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product-detail";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginUser from "./pages/login/LoginUser";
import LoginAdmin from "./pages/login-admin/LoginAdmin";
import RegisterPage from "./pages/register/RegisterPage";

const ProtectedRouteNonAuth = ({ children }) => {
	fetch("/users/verify", {
		method: "GET",
		redirect: "follow",
	})
		.then((res) => {
			if (res.status === 200) {
				alert("Anda sudah login");
				return <Navigate to="/" replace />;
			} else if (res.status === 403) {
				return children;
			}
		})
		.catch((err) => {
			alert(err.message);
			return <Navigate to="/login" replace />;
		});

	return children;
};
const ProtectedRouteAuth = ({ children }) => {
	const cekUser = async () => {
		const res = await fetch("/users/verify", {
			method: "GET",
			redirect: "follow",
		});

		if (res.status === 200) {
			return children;
		} else if (res.status === 403) {
			alert("Not Authorized");
			<Navigate to="/login" replace />;
		}
	};

	cekUser();
	// return children;
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
];

export default routes;
