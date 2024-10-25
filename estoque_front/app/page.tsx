"use client";

import { InternalURL } from "@/lib/type";
import { getInternalURL } from "@/lib/utils";

const LoginPage = () => {
  window.location.href = getInternalURL(
    InternalURL.NEXT_PUBLIC_FRONT_URL,
    "/login"
  );
  
  return <></>;
};

export default LoginPage;
