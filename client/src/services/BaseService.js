import { API } from "../configs/config";

class BaseService {
  async fetch(url, options, authenticate = false) {
    if (authenticate) {
      const token = localStorage.getItem("token");
      options.headers = {
        authorization: `${token}`,
      };
    }

    options.credentials = "include";
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };

    const response = await fetch(API + url, options);

    return await response.json();
  }
}

export default BaseService;
