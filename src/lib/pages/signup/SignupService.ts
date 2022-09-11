import axios from "axios";
import { API_ROOT_URL } from "../../config/config";

export class SignUpService {
  async signUp(signupData: { username; email; password }) {
    let url = this.url("api/signup");
    console.log(url);

    const res = await axios.post(url, signupData);
    return res.data;
  }

  url(path: string) {
    return API_ROOT_URL + path;
  }
}
