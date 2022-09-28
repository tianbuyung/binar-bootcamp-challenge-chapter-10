import { API } from "../configs/config";

class BaseService {
	async fetch(url, options, authenticate = false) {
		options.credentials = "include";
		options.headers = { "Content-Type": "application/json" };

		const response = await fetch(API + url, options);

		return await response.json();
	}
}

export default BaseService;
