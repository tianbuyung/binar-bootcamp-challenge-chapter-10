import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";
const authservice = new AuthService();
const withAuth = WrappedComponent => props => { // curry
    const router = useRouter();
    useEffect(() => {
        const cekUser = async () => {
            const token = localStorage.getItem('token')
            const verify = await authservice.verifyUser(token);
            if (verify.status !== 200) {
                router.push("/");
            }
        };
        cekUser();
    }, []);;
  return (
    <WrappedComponent
      {...props}
    />
  );
};
export default withAuth;