import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";
const authservice = new AuthService();
const withNoAuth = WrappedComponent => props => { // curry
    const router = useRouter();
    useEffect(() => {
        const cekUser = async () => {
            const token = localStorage.getItem('token')
            const verify = await authservice.verifyUser(token);
            console.log('verify =====>', verify?.status);
            if (verify.status === 200) {
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
export default withNoAuth;