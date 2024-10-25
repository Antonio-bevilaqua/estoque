import { Session } from "@/types/Session";
import axios, { AxiosResponse } from "axios";

export const getSession = async () => {
  try {
    const response = await axios.get<any, AxiosResponse<Session | null>>(
      "api/auth/sessao"
    );
    if (response.data) {
      return response.data;
    }

    return {
      is_logged_in: false,
    };
  } catch (e: any) {
    console.log(e);

    return {
      is_logged_in: false,
    };
  }
};

export const refreshSession = async () => {
  try {
    const response = await axios.get<any, AxiosResponse<Session | null>>(
      "api/auth/sessao/atualizar"
    );

    return response.data ?? null;
  } catch (e: any) {
    console.log(e);

    return null;
  }
};
