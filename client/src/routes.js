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

// ! bug = masih bisa tembus di beberapa halaman
const ProtectedRouteNonAuth = ({ children }) => {
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

  console.log("testing 1");
  //   return children;
  return children;
};

const ProtectedRouteAuth = ({ children }) => {
  const navigate = useNavigate();
  const cekUser = () => {
    const verify = fetch(API + "/users/verify", {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    });

    verify
      .then((res) => {
        if (res.status === 403) {
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log("error verify user = ", err);
      });
  };

  cekUser();

  return children;
};

// ! Error
const ProtectedRouteAdmin = ({ children }) => {
  const navigate = useNavigate();
  const cekAdmin = () => {
    const verify = fetch(API + "/admin/verify", {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    });

    verify
      .then((res) => {
        if (res.status === 403) {
          navigate("/admin/login");
        }
      })
      .catch((err) => {
        console.log("error verify admin = ", err);
      });
  };

  cekAdmin();
  return children;
};

const ProtectedRouteNonAuthAdmin = ({ children }) => {
  const navigate = useNavigate();
  const cekUser = () => {
    const verify = fetch(API + "/admin/verify", {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    });

    verify
      .then((res) => {
        if (res.status === 200) {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log("error verify admin = ", err);
      });
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
