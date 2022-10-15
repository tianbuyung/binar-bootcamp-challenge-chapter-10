import { Button, Card } from "react-bootstrap";
import ShowData from "./ShowData";
import { useRouter } from "next/router";

const Order = (props) => {
  const router = useRouter();

  const getOrder = async (id) => {
    router.push("/order/" + id);
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <ShowData label="Order Date" data={props.order.createdAt} />
        <hr />
        <ShowData label="Status" data={props.order.status} />
        <hr />
        <ShowData label="Total" data={props.order.totalOrder} />
        <Button
          variant="primary"
          onClick={() => getOrder(props.order.id)}
        >
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Order;
