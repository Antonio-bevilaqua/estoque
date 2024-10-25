import { axiosApi } from "@/config/axios.config";
import { struct } from "@/lib/type";
import { SessionCtx } from "@/provider/auth.provider";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useTheme } from "next-themes";
import React, { useContext } from "react";
import { toast as reToast } from "react-hot-toast";

export function useApi() {
  const session = useContext(SessionCtx);
  const { theme } = useTheme();
  const fetcher = axiosApi;

  const post = async <T = any>(
    url: string,
    data: any,
    config: AxiosRequestConfig<any> = {}
  ): Promise<T | null> => {
    try {
      config = addToken(config);
      const response = await fetcher.post(addApiPrefix(url), data, config);
      return isResponseValid(response) ? formatResponse(response) : null;
    } catch (error) {
      handleErrors(error);
      return null;
    }
  };

  const get = async <T = any>(
    url: string,
    config: AxiosRequestConfig<any> = {}
  ): Promise<T | null> => {
    try {
      config = addToken(config);
      const response = await fetcher.get(addApiPrefix(url), config);
      return isResponseValid(response) ? formatResponse(response) : null;
    } catch (error) {
      handleErrors(error);
      return null;
    }
  };

  const patch = async <T = any>(
    url: string,
    data: any,
    config: AxiosRequestConfig<any> = {}
  ): Promise<T | null> => {
    try {
      config = addToken(config);
      const response = await fetcher.patch(addApiPrefix(url), data, config);
      return isResponseValid(response) ? formatResponse(response) : null;
    } catch (error) {
      handleErrors(error);
      return null;
    }
  };

  const put = async <T = any>(
    url: string,
    data: any,
    config: AxiosRequestConfig<any> = {}
  ): Promise<T | null> => {
    try {
      config = addToken(config);
      const response = await fetcher.put(addApiPrefix(url), data, config);
      return isResponseValid(response) ? formatResponse(response) : null;
    } catch (error) {
      handleErrors(error);
      return null;
    }
  };

  const del = async <T = any>(
    url: string,
    config: AxiosRequestConfig<any> = {}
  ): Promise<T | null> => {
    try {
      config = addToken(config);
      const response = await fetcher.delete(addApiPrefix(url), config);
      return isResponseValid(response) ? formatResponse(response) : null;
    } catch (error: any) {
      handleErrors(error);
      return null;
    }
  };

  const addToken = (config: AxiosRequestConfig<any> = {}) => {
    if (!(session?.data?.is_logged_in ?? false)) return config;
    if (typeof config.headers === "undefined") {
      config.headers = {};
    }

    config.headers.Authorization = `Bearer ${session?.data?.token ?? ""}`;

    return config;
  };

  const addApiPrefix = (endpoint: string) => {
    if (endpoint[0] !== "/") endpoint = "/" + endpoint;

    if (endpoint.indexOf("/api/") === 0) {
      return endpoint;
    }

    return "/api" + endpoint;
  };

  const handleErrors = (error: any) => {
    switch (parseInt(error.request.status)) {
      case 400:
        return showInvalidResponseErrors(error.response.data);
      case 401:
      case 403:
      case 419:
        reToast.error(
          "Seu token de autenticação expirou, por favor, faça o login novamente."
        );
        window.location.href = "/logout";
        break;
      case 422:
        return showInvalidResponseErrors(error.response.data);
      default:
        if (error.request) {
          return reToast.error(
            "Ocorreu um erro na requisição, por favor, contate o suporte."
          );
        }

        reToast.error(
          "Erro na comunicação com a api, verifique sua conexão e caso o erro persista, contate o suporte."
        );
    }
  };

  const isResponseValid = (response: AxiosResponse) => {
    if (response.data.type === "SUCCESS") {
      return true;
    }

    showInvalidResponseErrors(response.data);
    return false;
  };

  const showInvalidResponseErrors = (data: any) => {
    if (typeof data === "string") {
      return reToast.error(data);
    }

    const errorData = data.errors ?? data.data ?? {};
    if (
      typeof errorData["token"] !== "undefined" &&
      errorData["token"].includes("Token expirado")
    ) {
      window.location.href = "/logout";
      return setTimeout(
        () => renderErrorObject(data.errors ?? data.data ?? {}),
        2000
      );
    }
    renderErrorObject(data.errors ?? data.data ?? {});
  };

  const renderErrorObject = (data: struct) => {
    const maxKeys = 5;
    let objectKeys = Object.keys(data);
    let totalObjectKeys = objectKeys.length;
    let objectKeysToRender =
      totalObjectKeys <= maxKeys
        ? objectKeys
        : objectKeys.filter((key: string, index: number) => index < maxKeys);

    let errors = (
      <div
        style={{
          background: theme === "dark" ? "#450a0a" : "#fee2e2",
          color: theme === "dark" ? "#fee2e2" : "#dc2626",
          display: "grid",
          gap: "1rem",
          border: theme === "dark" ? "1px solid #dc2626" : "1px solid #dc2626",
          borderRadius: "0.5rem",
          padding: "2rem",
          maxHeight: "80vh",
          overflowY: "hidden",
        }}
      >
        {objectKeysToRender.map((key: string, index: number) => (
          <React.Fragment key={`${key}_error_${index}`}>
            {renderErrors(key, data[key])}
          </React.Fragment>
        ))}
        {totalObjectKeys > maxKeys && (
          <p>
            <b>E mais {totalObjectKeys - maxKeys} erros...</b>
          </p>
        )}
      </div>
    );

    reToast.custom(errors, {
      duration: 10000,
      style: {
        maxHeight: "70vh",
        width: "600px",
        maxWidth: "100%",
        overflowY: "auto",
      },
    });
  };

  const renderErrors = (key: string, errors: string | Array<string>) => {
    const maxSameErrors = 2;
    if (typeof errors === "string") {
      return errors;
    }

    let totalErrors = errors.length;
    let showErrors =
      totalErrors <= maxSameErrors
        ? errors
        : errors.filter(
            (error: string, index: number) => index < maxSameErrors
          );
    return (
      <React.Fragment>
        {showErrors.map((error: string, index: number) => (
          <p key={`errors_${key}_${index}`}>
            <b>{key}:</b> {error.toString()}
          </p>
        ))}
        {totalErrors > maxSameErrors && (
          <p>
            <b>E mais {totalErrors - maxSameErrors} erros...</b>
          </p>
        )}
      </React.Fragment>
    );
  };

  const formatResponse = (response: AxiosResponse) => {
    return response.data.data;
  };

  return { post, get, put, patch, del };
}

export default useApi;
