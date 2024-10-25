import { User } from "./User";

export interface Session {
  user?: User;
  token?: string;
  is_logged_in: boolean;
}
