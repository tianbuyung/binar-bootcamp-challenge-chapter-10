import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const checkLogin = async () => {
    const res = await fetch("http://localhost:4000/users/verify", {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    });

    if (res.status === 200) {
      setIsLogin(true);
    } else if (res.status === 403) {
      return false;
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return {
    isLogin,
  };
};

export default useAuth;
