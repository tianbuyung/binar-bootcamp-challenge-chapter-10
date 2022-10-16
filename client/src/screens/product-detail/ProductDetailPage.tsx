import Navbar from "../../components/navbar";
import useProductDetailPage from "./useProductDetailPage";
import CartDetailService from "../../services/CartDetailService";
import BreadcrumbComponent from "../../components/breadcrumbs/BreadCrumbs";
import ShareButton from "./components/ShareButton";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { Placeholder, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

const NO_IMAGE =
  "https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg";
const cartDetailService = new CartDetailService();
const ProductDetailPage = ({ query }) => {
	const router = useRouter();
    const { product, loading } = useProductDetailPage({ id: query?.product_id });
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
			router.replace('/')
      }
    };

  return (
    <div>
      <Navbar variant="dark" bg="dark" />
      <Container>
        <BreadcrumbComponent data={breadcrumbs} baseColor="black" />
        {!loading ? (
					<Row xs={1} md={2} className="align-items-center p-2">
						<Col>
							<img
								style={{
									width: "auto",
									height: "auto",
									margin: "auto",
								}}
								src={product?.imageUrl || NO_IMAGE}
								alt={product?.name || "gambar"}
							/>
						</Col>
						<Col style={{ textAlign: "left" }}>
							<h2>{product?.name}</h2>
							<h3>{product?.Category?.name}</h3>
							<h3>Rp. {product?.price}K</h3>
							<br />
							<Button
								variant="primary"
								onClick={addCartDetail}
								className="mb-3 btn-lg w-100"
							>
								Buy
							</Button>
							<br />
							Share:{" "}
							<ShareButton
								name={product?.name}
								id={product?.id}
								className="m-2"
							/>
						</Col>
					</Row>
				) : (
					<Row xs={1} md={2} className="align-items-center">
						<Col>
							<img
								style={{
									width: 400,
									height: "auto",
									margin: "auto",
								}}
								src={NO_IMAGE}
								alt={"gambar"}
							/>
						</Col>
						<Col style={{ textAlign: "left" }}>
							<Placeholder as={"h2"} animation="glow">
								<Placeholder lg={12} size="lg" />
							</Placeholder>
							<Placeholder as={"h3"} animation="glow">
								<Placeholder lg={6} size="lg" />
							</Placeholder>
							<Placeholder as={"h3"} animation="glow">
								<Placeholder lg={6} size="lg" />
							</Placeholder>
							<Placeholder.Button
								size="lg"
								lg={12}
								variant="primary"
							/>
							{""}
							<Placeholder as={"h3"} animation="glow">
								<Placeholder lg={2} size="md" />{" "}
								<Placeholder
									lg={1}
									size="md"
									bg="secondary"
								/>{" "}
								<Placeholder
									lg={1}
									size="md"
									bg="info"
								/>
							</Placeholder>
						</Col>
					</Row>
				)}
      </Container>
    </div>
  );
};


ProductDetailPage.getInitialProps = async ({ query }) => {
    return {
        query
    }
}

export default ProductDetailPage;


