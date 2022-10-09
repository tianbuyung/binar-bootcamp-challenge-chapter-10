import BaseService from "./BaseService";
import { API } from "../configs/config";
export default class AuthService extends BaseService {
	async customFetch(url, options) {
		options.headers = { "Content-Type": "application/json" };
		options.credentials = "include";
		options.redirect = "follow";

		const response = await fetch(url, options);
		return response;
	}

	loginUser = async (data) => {
		const options = {
			method: "POST",
			body: JSON.stringify(data),
		};

		return await this.customFetch(API + "/users/login", options);
	};

	loginAdmin = async (data) => {
		const options = {
			method: "POST",
			body: JSON.stringify(data),
		};

		return await this.customFetch(API + "/admin", options);
	};

	register = async (data) => {
		const options = {
			method: "POST",
			body: JSON.stringify(data),
		};

		return await this.customFetch(API + "/users", options);
	};

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

	logoutAdmin = async () => {
		const options = {
			method: "POST",
		};

		return await this.customFetch(API + "/admin/logout", options);
	};

	logoutUser = async () => {
		const options = {
			method: "POST",
		};

		return await this.customFetch(API + "/users/logout", options);
	};
}
