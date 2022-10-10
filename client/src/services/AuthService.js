import BaseService from "./BaseService";
import { API } from "../configs/config";
export default class AuthService extends BaseService {
  async customFetch(url, options) {
    const response = await fetch(url, options);
    return response;
  }

  loginUser = async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      credentials: "include",
    };

    return await this.customFetch(API + "/users/login", options);
  };

  loginAdmin = async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      credentials: "include",
    };

    return await this.customFetch(API + "/admin", options);
  };

  register = async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      credentials: "include",
    };

    return await this.customFetch(API + "/users", options);
  };

  // ? buat utk verify user dan admin?
  verifyUser = async () => {
    const options = {
      method: "GET",
    };

    return await this.customFetch(API + "/users/verify", options);
  };

  verifyAdmin = async () => {
    const options = {
      method: "GET",
    };

    return await this.customFetch(API + "/admin/verify", options);
  };
}
