import { ReactNode } from "react";

// color type
export type color =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "destructive"
  | "secondary";
export type TextAreaColor =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "destructive";
export type InputColor =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "destructive";

//  variant
export type InputVariant =
  | "flat"
  | "underline"
  | "bordered"
  | "faded"
  | "ghost"
  | "flat-underline";
export type TextAreaVariant =
  | "flat"
  | "underline"
  | "bordered"
  | "faded"
  | "ghost"
  | "flat-underline";

// shadow
export type Shadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

// radius

export type Radius = "none" | "sm" | "md" | "lg" | "xl";

export enum InternalURL {
  NEXT_PUBLIC_FRONT_URL = "NEXT_PUBLIC_FRONT_URL",
  NEXT_PUBLIC_API_URL = "NEXT_PUBLIC_API_URL",
  NEXT_PUBLIC_MSAL_URL = "NEXT_PUBLIC_MSAL_URL",
}

export type EnvType = "sandbox" | "local" | "production";

export enum ResponseStatusType {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export interface ApiResponse<T> {
  type: ResponseStatusType;
  data?: T;
  message?: string;
}

export type struct<T = any> = {
  [key: string]: T;
};

export type ComponentWithChildren = {
  children: ReactNode;
};

export type ComponentWithClass = {
  className?: string;
};

export type ComponentWithChildrenAndClass = ComponentWithChildren &
  ComponentWithClass;

export enum HttpMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "del",
}

export type newStateFunction<T> = (previous: T) => T;

export type SetState<T> = (newState: T | newStateFunction<T>) => void;

export type StateContext<T> = {
  state: T;
  setState: SetState<T>;
};
