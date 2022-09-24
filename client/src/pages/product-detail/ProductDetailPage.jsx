import Navbar from "../../components/navbar";
import useProductDetailPage from "./useProductDetailPage";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CartDetailService from "../../services/CartDetailService";
const NO_IMAGE = 'https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg'
const cartDetailService = new CartDetailService();
const ProductDetailPage = () => {
    const { product_id } = useParams()
    const { product } = useProductDetailPage({ id: product_id });

    const addCartDetail = async () => {
        const body = {
            ProductId: product_id,
            qty: 1,
            isIcrement: true
        }

        const data = await cartDetailService.createCartDetail(body);

        alert(data.message);
    }

    return (
        <div>
            <Navbar variant="dark" bg="dark" />
            <Card style={{ width: '100%' }}>
                <Card.Img style={{ width: 400, height: 'auto', margin: 'auto' }} variant="top" src={product?.image || NO_IMAGE} />
                <Card.Body>
                    <Card.Title>{product?.name}</Card.Title>
                    <Card.Text>
                        Category: {product?.Category?.name}
                    </Card.Text>
                    <Card.Text>
                        Price: Rp. {product?.price}K
                    </Card.Text>
                    <Button variant="primary" title={"Buy"} onClick={addCartDetail}></Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProductDetailPage;