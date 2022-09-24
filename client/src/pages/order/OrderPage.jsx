import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../services/OrderService";

const orderService = new OrderService();

const OrderPage = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState();
    const { orderId } = useParams();

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        const data = await orderService.getOrder(orderId);
        setOrder(data.data);
        setLoading(false);
    }

    return (
        <>
            <h1>Ini OrderPage Page</h1>
            {
                !loading ? (
                    <>
                        <ul>
                            {order.OrderDetails.map((orderDetail) => <li key={orderDetail.id}>
                                {orderDetail.Product.name}
                            </li>)}
                        </ul>
                    </>
                ) : (
                    <div>
                        Loading...
                    </div>
                )
            }
        </>
    )
}

export default OrderPage;