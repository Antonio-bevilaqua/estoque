"use client";

import { SESSION_KEY } from "@/config/auth";
import { SessionCtx } from "@/provider/auth.provider";
import { Session } from "@/types/Session";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import useApi from "./use-api";
import { User } from "@/types/User";
import { getInternalURL } from "@/lib/utils";
import { InternalURL } from "@/lib/type";

export enum AuthStatus {
  AUTHENTICATED,
  GUEST,
}

type LoginResponse = {
  token: string;
  user: User;
};

export default function useAuth(): {
  data: Session;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refresh: () => Promise<Session>;
  isAuthenticated: () => boolean;
} {
  const api = useApi();
  const router = useRouter();
  const { data, setData } = useContext(SessionCtx);

  const logout = (): void => {
    localStorage.removeItem(SESSION_KEY);
    setData({ is_logged_in: false });
    window.location.href = getInternalURL(
      InternalURL.NEXT_PUBLIC_FRONT_URL,
      "/login"
    );
  };

  const refresh = async (): Promise<Session> => {
    if (!data.token) return;

    const user = await api.get<User | null>("user");

    if (!user) return;

    let newSession: Session = {
      ...data,
    };
    newSession.user = { ...user };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setData(newSession);
    return newSession;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const response = await api.post<LoginResponse | null>("login", {
      email,
      password,
    });

    const session = loadSession(response);

    if (session.is_logged_in) {
      return true;
    }
    return null;
  };

  const loadSession = (response: LoginResponse | null): Session => {
    let newSession: Session = {
      is_logged_in: false,
    };
    if (response) {
      newSession.is_logged_in = true;
      newSession.token = response.token;
      newSession.user = response.user;

      localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));

      setData(newSession);
    }

    return newSession;
  };

  const isAuthenticated = (): boolean => {
    return data.is_logged_in;
  };

  return {
    data,
    login,
    logout,
    refresh,
    isAuthenticated,
  };
}
