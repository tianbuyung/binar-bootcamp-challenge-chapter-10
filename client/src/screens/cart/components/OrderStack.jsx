import { Button, Form } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
const NO_IMAGE = 'https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg'

function OrderStack({ orderDetail }) {
    return (
        <Stack direction="horizontal" gap={3} className="mb-2">
            <div><img src={orderDetail.Product.imageUrl || NO_IMAGE} className="img-thumbnail"
                alt={orderDetail.Product.name} width="100" height="auto" />
            </div>
            <div>
                {orderDetail.Product.name}
            </div>
            <div>
                {orderDetail.qty}
                {' x '}
                {orderDetail.price}
                {' = '}
                {orderDetail.totalOrderDetail}
            </div>
        </Stack>
    );
}

export default OrderStack;