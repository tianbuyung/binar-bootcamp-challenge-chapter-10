import BaseService from "./BaseService";

export default class CartService extends BaseService {
	getCart = async (query) => {
		const options = {
			method: "GET",
		};

		return await this.fetch("/carts/" + query, options, true);
	};
}
