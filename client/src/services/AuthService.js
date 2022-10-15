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

	logoutAdmin = async () => {
		const dispatch = useDispatch();

		localStorage.removeItem("tokenAdmin");
		if (localStorage.getItem("tokenAdmin") === null) {
			dispatch(logoutAdmin());
			return "success";
		} else {
			return "failed";
		}
	};

	logoutUser = () => {
		const dispatch = useDispatch();

		localStorage.removeItem("token");
		if (localStorage.getItem("token") === null) {
			dispatch(logout());
			return "success";
		} else {
			return "failed";
		}
	};
}
