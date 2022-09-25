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
			// alert("Anda sudah login!");
			return navigate("/", { replace: true });
		} else if (res.status === 403) {
			return children;
		}
	};

	cekUser();
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
			// alert("Anda harus login!");
			return navigate("/login", { replace: true });
		}
	};
	cekUser();
};

// ! Error
// const ProtectedRouteAdmin = async ({ children }) => {
// 	const navigate = useNavigate();
// 	const cekAdmin = async () => {
// 		const res = await fetch("/admin/verify", {
// 			method: "GET",
// 			redirect: "follow",
// 			credentials: "include",
// 		});

// 		if (res.status === 200) {
// 			await children;
// 			return children;
// 		} else if (res.status === 403) {
// 			alert("Hanya bisa diakses oleh Admin!");
// 			navigate("/login", { replace: true });
// 		}
// 	};

// 	cekAdmin();
// };

// const ProtectedRouteNonAuthAdmin = ({ children }) => {
// 	const navigate = useNavigate();
// 	const cekUser = async () => {
// 		const res = await fetch("/admin/verify", {
// 			method: "GET",
// 			redirect: "follow",
// 			credentials: "include",
// 		});

// 		if (res.status === 200) {
// 			alert("Anda sudah login!");
// 			navigate("/", { replace: true });
// 		} else if (res.status === 403) {
// 			return children;
// 		}
// 	};

// 	cekUser();
// 	return children;
// };
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
			// <ProtectedRouteNonAuthAdmin>
			<LoginAdmin />
			// </ProtectedRouteNonAuthAdmin>
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
			// <ProtectedRouteAdmin>
			<Admin />
			// </ProtectedRouteAdmin>
		),
	},
	// {
	// 	path: "/test",
	// 	page: <Test />,
	// },
];

export default routes;
