import { API_ROOT_URL, Constants } from "../config/config";
import type { User } from "../data/User";
import * as http from "./http";

export class AuthService {
  async signUp(signupData: { username; email; password }) {
    let signUpURL = http.url("api/signup");

    const res = await http.post(signUpURL, signupData);
    return res.data;
  }

  async currentUser(): Promise<User> {
    if (http.isStoredAccessToken()) {
      const me = (await http.get("api/me").catch(() => null))?.data;
      return me;
    } else {
      return null;
    }
  }
}
