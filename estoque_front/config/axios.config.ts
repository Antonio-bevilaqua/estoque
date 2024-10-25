import { EnvType } from "@/lib/type";
import axios from "axios";

const urls = {
  production: process.env.NEXT_PUBLIC_API_URL,
  local: process.env.NEXT_PUBLIC_LOCAL_API_URL,
  sandbox: process.env.NEXT_PUBLIC_SANDBOX_API_URL, 
};

const environment: EnvType =
  (process.env.NEXT_PUBLIC_ENVIROMENT as EnvType) ?? "production";

export const apiURL = urls[environment];

export const axiosApi = axios.create({
  baseURL: apiURL,
});
