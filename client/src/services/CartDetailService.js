import BaseService from "./BaseService";

export default class CartDetailService extends BaseService {
    createCartDetail = async (data) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        }

        return await this.fetch('/cartDetails/', options, true);
    }

    deleteCartDetail = async (id) => {
        const options = {
            method: 'DELETE'
        }

        return await this.fetch('/cartDetails/' + id, options, true);
    }
}