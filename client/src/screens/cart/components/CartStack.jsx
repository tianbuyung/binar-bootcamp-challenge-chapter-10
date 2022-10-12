import { Button, Form } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
const NO_IMAGE = 'https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg'

function CartStack({ cartDetail, inputs, handleChange, deleteCartDetail }) {
    return (
        <Stack direction="horizontal" gap={3} className="mb-3 p-3 border">
            <div><img src={cartDetail.Product.imageUrl || NO_IMAGE} className="img-thumbnail" alt={cartDetail.Product.name}
                width="100" height="auto" /></div>
            <div>
                {cartDetail.Product.name}
                <Form.Control type="number" placeholder="Qty" min="1"
                    id={'qty-' + cartDetail.id} value={inputs['qty-' + cartDetail.id] || cartDetail.qty}
                    onChange={(event) => handleChange(event, cartDetail.ProductId, cartDetail.Product.name)} />
            </div>
            <div>
                {cartDetail.Product.price}
                <br />
                <Button variant="danger" onClick={() => deleteCartDetail(cartDetail.id, cartDetail.Product.name)}>
                    <i className="bi-trash"></i>
                </Button>
            </div>
        </Stack>
    );
}

export default CartStack;