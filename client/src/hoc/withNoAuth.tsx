import { useRouter } from "next/router";
import { useAuth, useAuthAdmin } from "../hooks/useAuth";

const withNoAuth = WrappedComponent => props => { 
  const router = useRouter();
  const isUser = useAuth();

  if (isUser === true) {
		router.replace("/");
	}

  return (
    <WrappedComponent
      {...props}
    />
  );
};

const withNoAuthAdmin = WrappedComponent => props => { 
  const router = useRouter();
  const isAdmin = useAuthAdmin();

  if (isAdmin === true) {
		router.replace("/admin");
	}

  return (
    <WrappedComponent
      {...props}
    />
  );
};

export { withNoAuth, withNoAuthAdmin };