import { useRouter } from "next/router";
import { useEffect } from 'react';
import { useAuth, useAuthAdmin } from "../hooks/useAuth";

const withAuthAdmin = WrappedComponent => props => {
  const router = useRouter();
  const isAdmin = useAuthAdmin();

  useEffect(() => {
    if (isAdmin === false) {
      router.replace("/");
    }
  }, [isAdmin]);

  return (
    <WrappedComponent
      {...props}
    />
  );
};

const withAuth = WrappedComponent => props => {
  const router = useRouter();
  const isUser = useAuth();

  useEffect(() => {
    if (isUser === false) {
      router.replace("/login");
    }
  },
    [isUser],
  )
  
  return (
    <WrappedComponent
      {...props}
    />
  );
};
export {withAuthAdmin, withAuth};