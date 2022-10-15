import { useRouter } from "next/router";
import { useAuth, useAuthAdmin } from "../hooks/useAuth";

const withAuthAdmin = WrappedComponent => props => { // curry
  const router = useRouter();
  const isAdmin = useAuthAdmin();

  if (isAdmin === false) {
		router.replace("/");
	}

  return (
    <WrappedComponent
      {...props}
    />
  );
};

const withAuth = WrappedComponent => props => { // curry
  const router = useRouter();
  const isUser = useAuth();

  if (isUser === false) {
		router.replace("/login");
	}

  return (
    <WrappedComponent
      {...props}
    />
  );
};
export {withAuthAdmin, withAuth};