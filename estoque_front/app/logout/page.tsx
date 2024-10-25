"use client";

import useAuth from "@/hooks/use-auth";
import React, { useEffect } from "react";

export default function page() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);
  return <></>;
}
