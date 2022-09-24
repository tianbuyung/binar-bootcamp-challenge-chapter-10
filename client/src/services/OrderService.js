import BaseService from "./BaseService";

export default class OrderService extends BaseService {
    createOrder = async (data) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        }

        return await this.fetch('/orders/', options, true);
    }

    getOrder = async (query) => {
        const options = {
            method: 'GET'
        }

        return await this.fetch('/orders/' + query, options, true);
    }
}