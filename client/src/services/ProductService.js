import BaseService from "./BaseService";

export default class ProductService extends BaseService {
	addProduct = async (data) => {
		const options = {
			method: "POST",
			body: JSON.stringify(data),
		};

		return await this.fetch("/admin/products", options, true, "admin");
	};

	getAllProducts = async (query) => {
		const options = {
			method: "GET",
		};

		return await this.fetch(
			"/admin/products" + query,
			options,
			true,
			"admin"
		);
	};

	getProductDetailUser = async (id) => {
		const options = {
			method: "GET",
		};

		return await this.fetch("/product/" + id, options, false);
	};

	getProductPopular = async () => {
		const options = {
			method: "GET",
		};
		return await this.fetch("/product/popular", options, false);
	};

	editProduct = async (data, id) => {
		const options = {
			method: "PUT",
			body: JSON.stringify(data),
		};

		return await this.fetch(`/admin/products/${id}`, options, true);
	};

	deleteProduct = async (id) => {
		const options = {
			method: "DELETE",
		};

		return await this.fetch(`/admin/products/${id}`, options, true);
	};
}
