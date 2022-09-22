import { Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product-detail";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Admin from "./pages/admin";
import CartPage from "./pages/cart/CartPage";
import OrderPage from "./pages/order/OrderPage";

const ProtectedRouteNonAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const ProtectedRouteAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth/login" replace />;
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
  {
    path: "/cart",
    page: <CartPage />
  },
  {
    path: "/order/:orderId",
    page: <OrderPage />
  }
];

export default routes;
