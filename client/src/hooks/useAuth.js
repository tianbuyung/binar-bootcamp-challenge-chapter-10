import { useEffect, useState } from "react";
import { API } from "../configs/config";
const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const checkLogin = async () => {
    const res = await fetch(API + "/users/verify", {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    console.log("res", res.status);

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
