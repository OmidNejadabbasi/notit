import { API_ROOT_URL, Constants } from "../config/config";
import type { User } from "../data/User";
import { HttpModule, tHttpModule } from "./http";
import { Inject, Injectable } from "container-ioc";

export const tAuthService = Symbol("authService");
@Injectable()
export class AuthService {
  user: User;

  constructor(@Inject(tHttpModule) private http: HttpModule) {
    console.log("created from sl");
  }

  async signUp(signupData: { username; email; password }) {
    let signUpURL = this.http.url("api/signup");

    const res = await this.http.post(signUpURL, signupData);
    return res.data;
  }

  async login(credentials: { email; password }) {
    let logInURL = this.http.url("api/login");

    const res = await this.http.post(logInURL, credentials);
    return res.data;
  }

  async currentUser(): Promise<User> {
    if (this.http.isStoredAccessToken() && !this.user) {
      const me: User = (
        await this.http.get(this.http.url("api/me")).catch(() => {
          return null;
        })
      )?.data;
      this.user = me;
      return me;
    } else {
      return this.user;
    }
  }
}
