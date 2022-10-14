import { useEffect } from "react";
import { useState } from "react";
import OrderService from "../../services/OrderService";
import Navbar from "../../components/navbar"
import { Container } from "react-bootstrap";
import OrderStack from "../cart/components/OrderStack";

const orderService = new OrderService();

const OrderPage = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState();
    const orderId = 2;
    // const { orderId } = useParams();

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        const data = await orderService.getOrder(orderId);
        setOrder(data.data);
        setLoading(false);
        console.log(data.data)
    }

    return (
        <>
            <Navbar variant="dark" bg="dark" />
            {
                !loading ? (
                    <Container>
                        <h1 className="mt-3 mb-3">My Order</h1>
                        <div className="border p-1">
                            <div className="border mb-2">Order Date: {order?.createdAt}</div>
                            {order?.OrderDetails.map((orderDetail) =>
                                <OrderStack key={orderDetail.id} orderDetail={orderDetail} />)}
                            <div className="border">Total: {order?.totalOrder}</div>
                        </div>
                    </Container>
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