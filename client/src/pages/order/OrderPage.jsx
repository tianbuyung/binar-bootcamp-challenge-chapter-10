import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const OrderPage = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState();
    const { orderId } = useParams();

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        const response = await fetch(
            process.env.REACT_APP_SERVER + "/orders/" + orderId, { method: 'GET' }
        )

        if (!response.ok) {
            setLoading(false);
            alert(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            setOrder(data.data);
            setLoading(false);
        }
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