import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const Auth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        router.push("/auth/sign-in");
      }
    }, []);

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
