import {User} from "./user.model";

export interface LoginResponse {
  user: User
  access_token: string,
  refresh_token: string,
  expires_in: string,
  refresh_in: string,

}
