import BaseService from "./BaseService";

export default class UserService extends BaseService {
  getUser = async () => {
    const options = {
      method: "GET",
    };

    return await this.fetch("/users", options, true);
  };
}
