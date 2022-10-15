import BaseService from "./BaseService";
import { API } from "../configs/config";

import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
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

	verifyUser = async (token) => {
		const options = {
			method: "GET",
			headers: {
				authorization: token,
			},
		};

		return await this.customFetch(API + "/users/verify", options);
	};

	verifyAdmin = async (token) => {
		const options = {
			method: "GET",
			headers: {
				authorization: token,
			},
		};

		return await this.customFetch(API + "/admin/verify", options);
	};

	logoutAdmin = () => {
		localStorage.removeItem("tokenAdmin");
		if (localStorage.getItem("tokenAdmin") === null) {
			return "success";
		} else {
			return "failed";
		}
	};

	logoutUser = () => {
		localStorage.removeItem("token");
		if (localStorage.getItem("token") === null) {
			return "success";
		} else {
			return "failed";
		}
	};
}
