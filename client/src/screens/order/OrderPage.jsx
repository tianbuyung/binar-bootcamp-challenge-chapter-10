import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";

import OrderService from "../../services/OrderService";
import Navbar from "../../components/navbar";
import OrderStack from "../cart/components/OrderStack";
import { withAuth } from "../../hoc/withAuth";

const orderService = new OrderService();

const OrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const data = await orderService.getOrder(orderId);
    setOrder(data.data);
    setLoading(false);
    console.log(data.data);
  };

  const updateOrder = async (status) => {
    if (window.confirm(status + " order?")) {
      let statusBody = "done";
      if (status === "Cancel") {
        statusBody = "cancelled";
      }
      const body = {
        status: statusBody,
      };
      const data = await orderService.updateOrder(orderId, body);
      alert(data.message);
      fetchOrder();
    }
  };

  return (
    <>
      <Navbar variant="dark" bg="dark" />
      {!loading ? (
        <Container>
          <h1 className="mt-3 mb-3">My Order</h1>
          <div className="border p-1">
            <div className="border mb-2">
              Order Date: {order?.createdAt}
              <br />
              Status: {order?.status.toUpperCase()}
            </div>
            {order?.OrderDetails.map((orderDetail) => (
              <OrderStack key={orderDetail.id} orderDetail={orderDetail} />
            ))}
            <div className="border">
              Total: {order?.totalOrder}
              {order?.status === "waiting payment" ? (
                <div>
                  <Button
                    variant="primary"
                    onClick={() => updateOrder("Confirm")}
                  >
                    Confirm
                  </Button>
                  &nbsp;
                  <Button
                    variant="danger"
                    onClick={() => updateOrder("Cancel")}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default withAuth(OrderPage);
