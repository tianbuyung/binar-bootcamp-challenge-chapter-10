import { useState, useEffect } from "react";
import {
	Button,
	Container,
	Row,
	Col,
	Card,
	Stack,
	Placeholder,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CartDetailService from "../../services/CartDetailService";
import CartService from "../../services/CartService";
import OrderService from "../../services/OrderService";
import CartStack from "./components/CartStack";
import Navbar from "../../components/navbar";
const NO_IMAGE =
	"https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg";

const cartService = new CartService();
const cartDetailService = new CartDetailService();
const orderService = new OrderService();

const CartPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [cart, setCart] = useState();
	const [inputs, setInputs] = useState({});
	const [totalCart, setTotalCart] = useState(0);

	const handleChange = (event, productId, productName) => {
		const id = event.target.id;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [id]: value }));

		if (value > 0) {
			updateCartDetail(event, productId);
		} else {
			deleteCartDetail(id, productName);
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	const fetchCart = async () => {
		const data = await cartService.getCart("");
		setCart(data.data);
		setLoading(false);
	};

	useEffect(() => {
		const updateTotalCart = () => {
			let result = 0;

			if (cart) {
				cart.CartDetails.forEach((cartDetail) => {
					let subResult =
						cartDetail.qty * cartDetail.Product.price;
					result += subResult;
				});
				setTotalCart(result);
			}
		};
		updateTotalCart();
	}, [cart]);

	const updateCartDetail = async (event, productId) => {
		const body = {
			ProductId: productId,
			qty: event.target.value,
			isIcrement: false,
		};

		await cartDetailService.createCartDetail(body);

		fetchCart();
	};

	const deleteCartDetail = async (id, cartProductName) => {
		if (
			window.confirm(
				"Are you sure you want to delete this item '" +
					cartProductName +
					"'?"
			)
		) {
			const data = await cartDetailService.deleteCartDetail(id);
			alert(data.message);
			fetchCart();
		} else {
			// return before value
		}
	};

	const createOrder = async () => {
		const body = {
			totalOrder: totalCart,
		};

		const data = await orderService.createOrder(body);
		alert(data.message);
		navigate("/order/" + data.data.id);
	};

	return (
		<>
			<Navbar variant="dark" bg="dark" />
			{!loading ? (
				<Container>
					<h1 className="mt-3 mb-3">My Cart</h1>
					<Row xs={1} md={2} align="center">
						<Col>
							{cart?.CartDetails.map((cartDetail) => (
								<CartStack
									key={cartDetail.id}
									cartDetail={cartDetail}
									inputs={inputs}
									handleChange={handleChange}
									deleteCartDetail={deleteCartDetail}
								/>
							))}
						</Col>
						<Col>
							<Card style={{ width: "100%" }}>
								<Card.Body>
									<Card.Title>
										Total Harga
									</Card.Title>
									<Card.Text>
										Rp {totalCart}
									</Card.Text>
									<Button
										variant="primary"
										onClick={createOrder}
									>
										Checkout
									</Button>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			) : (
				<Container>
					<h1 className="mt-3 mb-3">My Cart</h1>
					<Row xs={1} md={2}>
						<Col>
							{Array.from(new Array(3)).map((_, i) => (
								<Stack
									direction="horizontal"
									gap={3}
									className="mb-3 p-3 border"
								>
									<img
										src={NO_IMAGE}
										className="img-thumbnail"
										alt={"loading"}
										width="100"
										height="auto"
									/>
									<Placeholder
										size="lg"
										lg={5}
										bg="secondary"
									/>
									<Placeholder.Button
										size="lg"
										lg={1}
										variant="danger"
									/>
								</Stack>
							))}
						</Col>
						<Col>
							<Card
								style={{
									width: "100%",
								}}
							>
								<Card.Body>
									<Placeholder
										as={Card.Title}
										animation="glow"
										bg="secondary"
									>
										<Placeholder lg={6} />
									</Placeholder>
									<Placeholder
										as={Card.Text}
										animation="glow"
										bg="secondary"
									>
										<Placeholder lg={2} />
									</Placeholder>
									<Placeholder.Button
										lg={3}
										variant={"primary"}
									/>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};

export default CartPage;
