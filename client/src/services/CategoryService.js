import BaseService from "./BaseService";

export default class CategoryService extends BaseService {
  getAllCategories = async () => {
    const options = {
      method: "GET",
    };

    return await this.fetch("/categories", options, false);
  };

  getProductsCategories = async ({ query }) => {
    const options = {
      method: "GET",
    };
    return await this.fetch("/categories/" + query, options, false);
  };
}
