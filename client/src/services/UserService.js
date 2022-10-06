import BaseService from "./BaseService";

export default class UserService extends BaseService {
  getUser = async () => {
    const options = {
      method: "GET",
    };

    return await this.fetch("/users", options, true);
  };
  getBadge = async () => {
    const options = {
      method: "GET",
    };

    return await this.fetch("/users/badge", options, true);
  };
  editUser = async (data) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
    };

    return await this.fetch(`/users/edit`, options, true);
  };
}
