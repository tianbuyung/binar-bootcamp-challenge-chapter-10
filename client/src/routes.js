<<<<<<< HEAD
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
import { API } from "./configs/config";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
=======
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

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
>>>>>>> origin/main

// ! bug = masih bisa tembus di beberapa halaman
const authservice = new AuthService();
const ProtectedRouteNonAuth = ({ children }) => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    const cekUser = () => {
      console.log("testing 2");
      const verify = fetch(API + "/users/verify", {
        method: "GET",
        redirect: "follow",
        credentials: "include",
      });
      console.log("verify", verify);

      verify
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log("error verify user = ", err);
        });
    };
    cekUser();
  }, []);
=======
	const navigate = useNavigate();
	useEffect(() => {
		const cekUser = async () => {
			const verify = await authservice.verifyUser();

			if (verify.status === 200) {
				navigate("/", { replace: true });
			}
		};
		cekUser();
	});
>>>>>>> origin/main

  console.log("testing 1");
  //   return children;
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
