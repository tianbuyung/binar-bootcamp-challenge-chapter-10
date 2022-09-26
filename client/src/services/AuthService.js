import BaseService from "./BaseService";

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

		return await this.customFetch("users/login", options);
	};

	loginAdmin = async (data) => {
		const options = {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
			redirect: "follow",
			credentials: "include",
		};

		return await this.customFetch("/admin", options);
	};

	register = async (data) => {
		const options = {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
			redirect: "follow",
			credentials: "include",
		};

		return await this.customFetch("users/register", options);
	};

	// ? buat utk verify user dan admin?
}
