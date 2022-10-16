import { useRouter } from "next/router";
import { useAuth, useAuthAdmin } from "../hooks/useAuth";
import { useEffect } from 'react';

const withNoAuth = WrappedComponent => props => { 
  const router = useRouter();
  const isUser = useAuth();

  useEffect(() => {
    if (isUser.isLoading === false) {
      if (isUser.isUser === true) {
        router.replace("/");
      }
    }
  }, [isUser])

  return (
    <WrappedComponent
      {...props}
    />
  );
};

const withNoAuthAdmin = WrappedComponent => props => { 
  const router = useRouter();
  const isAdmin = useAuthAdmin();

  useEffect(() => {
    if (isAdmin.isLoading === false) {
      if (isAdmin.isAdmin === true) {
        router.replace("/");
      }
    }
  }, [isAdmin]);
  
  return (
    <WrappedComponent
      {...props}
    />
  );
};

export { withNoAuth, withNoAuthAdmin };