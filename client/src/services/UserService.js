import BaseService from "./BaseService";

export default class UserService extends BaseService {
  getUser = async (email) => {
    const options = {
      method: "GET",
    };

    return await this.fetch("/users/" + email, options, true);
  };
}
