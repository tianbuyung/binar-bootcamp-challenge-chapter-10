import Navbar from "../../components/navbar";
import useProductDetailPage from "./useProductDetailPage";
// import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import CartDetailService from "../../services/CartDetailService";
import BreadcrumbComponent from "../../components/breadcrumbs/BreadCrumbs";
import ShareButton from "./components/ShareButton";

const NO_IMAGE =
  "https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg";
const cartDetailService = new CartDetailService();
const ProductDetailPage = ({ query }) => {
    const { product } = useProductDetailPage({ id: query?.slug });
    const breadcrumbs = product ? [
        { title: 'Home', isActive: false, href: "/" },
        { title: product?.Category?.name, isActive: false, href: `/product/category/${product?.Category?.id}` },
        { title: product?.name, isActive: true }
    ] : [ { title: 'Home', isActive: false, href: "/" },]

  const addCartDetail = async () => {
    try {
      const body = {
        ProductId: product?.id,
        qty: 1,
        isIcrement: true,
      };

      const data = await cartDetailService.createCartDetail(body);

            alert(data.message);
        } catch (error) {
            alert(error.message);
            // navigate("/login", { replace: true });
        }
    };

  return (
    <div>
      <Navbar variant="dark" bg="dark" />
      <Container>
        <BreadcrumbComponent data={breadcrumbs} baseColor="black" />
        <Card style={{ width: "100%" }}>
          <Card.Img
            style={{ width: 400, height: "auto", margin: "auto" }}
            variant="top"
            src={product?.imageUrl || NO_IMAGE}
          />
          <Card.Body>
            <Card.Title>{product?.name}</Card.Title>
            <Card.Text>Category: {product?.Category?.name}</Card.Text>
            <Card.Text>Price: Rp. {product?.price}K</Card.Text>
            <Button variant="primary" onClick={addCartDetail} className="mb-3">
              Buy
            </Button>
            {product && (
                <div>
                  Share: <ShareButton name={product?.name} id={product?.id} />
                </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};


ProductDetailPage.getInitialProps = async ({ query }) => {
    // const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + query?.slug)
    // const post = await res.json();
    return {
        query
    }
}

export default ProductDetailPage;
