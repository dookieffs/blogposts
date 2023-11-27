import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@context/AuthContext";

interface RedirectAuthenticatedProps extends PropsWithChildren {
  redirectUrl: string;
}

function RedirectAuthenticated({
  redirectUrl,
  children
}: RedirectAuthenticatedProps) {
  const { user } = useAuthContext();

  if (user !== null) {
    return <Navigate to={redirectUrl} />;
  }

  return <>{children}</>;
}

export const withRedirectAuthenticated = <Props extends object>(
  Wrapped: React.FC<Props>,
  redirectAuthenticatedProps: RedirectAuthenticatedProps
) => {
  return (props: Props) => (
    <RedirectAuthenticated {...redirectAuthenticatedProps}>
      <Wrapped {...props} />
    </RedirectAuthenticated>
  );
};

export default RedirectAuthenticated;
