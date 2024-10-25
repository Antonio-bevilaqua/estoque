"use client";

import React from "react";
import { SESSION_KEY } from "@/config/auth";
import { Session } from "@/types/Session";
import { createContext, useEffect, useState } from "react";

type SessionCtxType = {
  data: Session;
  setData: (data: Session) => void;
};

export const SessionCtx = createContext<SessionCtxType | null>(null);

const getSession = () => {
  if (!localStorage) return { is_logged_in: false };
  const sess = localStorage.getItem(SESSION_KEY);
  if (!sess) return { is_logged_in: false };

  return JSON.parse(sess);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const [session, setSession] = useState<Session>({ is_logged_in: false });

  useEffect(() => {
    setSession(getSession());
    setLoaded(true);
  }, []);

  if (!loaded) return <></>;

  return (
    <SessionCtx.Provider value={{ data: session, setData: setSession }}>
      {children}
    </SessionCtx.Provider>
  );
};

export default AuthProvider;
