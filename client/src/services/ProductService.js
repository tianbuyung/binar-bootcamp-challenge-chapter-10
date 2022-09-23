import BaseService from "./BaseService";

export default class ProductService extends BaseService {
  addProduct = async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
    };

    console.log("options", options);

    return await this.fetch("/admin/products", options, true);
  };

  getAllProducts = async (query) => {
    const options = {
      method: "GET",
    };

    return await this.fetch("/admin/products" + query, options, true);
  };

  getProductDetailUser = async (id) => {
    const options = {
      method: "GET",
    };

    return await this.fetch("/product/" + id, options, false);
  };
}
