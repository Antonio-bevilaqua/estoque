import useAuth, { AuthStatus } from "@/hooks/use-auth";
import { ComponentWithChildren, InternalURL } from "@/lib/type";
import { getInternalURL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type AuthStatusProps = ComponentWithChildren & {
  status: AuthStatus;
  onFailure?: () => void | null;
  onSuccess?: () => void | null;
  onFailureRedirectRoute?: string | null;
};

export default function RequireAuthStatus({
  status,
  children,
  onFailure = null,
  onSuccess = null,
  onFailureRedirectRoute = null,
}: AuthStatusProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const isStatusChecked = () => {
      if (status === AuthStatus.AUTHENTICATED) {
        return isAuthenticated();
      }

      return !isAuthenticated();
    };

    const statusSuccess = () => {
      if (typeof onSuccess === "function") onSuccess();

      setReady(true);
    };

    const statusFailure = () => {
      if (typeof onFailure === "function") onFailure();

      if (onFailureRedirectRoute !== null) {
        window.location.href = getInternalURL(
          InternalURL.NEXT_PUBLIC_FRONT_URL,
          onFailureRedirectRoute
        );
      }
    };

    if (isStatusChecked()) statusSuccess();
    else statusFailure();
  }, []);

  if (!ready) return <></>;

  return <>{children}</>;
}
