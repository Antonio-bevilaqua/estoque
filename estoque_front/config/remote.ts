import { enviroment } from "@/lib/utils";
import axios from "axios";

const urls = {
  sandbox: process.env.NEXT_PUBLIC_SANDBOX_API_URL ?? "",
  local: process.env.NEXT_PUBLIC_LOCAL_API_URL ?? "",
  production: process.env.NEXT_PUBLIC_API_URL ?? "",
};

export const apiUrl = urls[enviroment] + "/api";
export const remote = axios.create({
  baseURL: apiUrl,
});
