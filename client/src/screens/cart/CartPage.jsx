import { useState } from "react";
import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartDetailService from "../../services/CartDetailService";
import CartService from "../../services/CartService";
import OrderService from "../../services/OrderService";
import CartStack from "./components/CartStack";
import Navbar from "../../components/navbar"

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
		setInputs(values => ({ ...values, [id]: value }));

		if (value > 0) {
			updateCartDetail(event, productId);
		} else {
			deleteCartDetail(id, productName);
		}
	}

	useEffect(() => {
		fetchCart();
	}, []);

	const fetchCart = async () => {
		const data = await cartService.getCart('');
		setCart(data.data);
		setLoading(false);
	}

	useEffect(() => {
		const updateTotalCart = () => {
			let result = 0;

			if (cart) {
				cart.CartDetails.forEach(cartDetail => {
					let subResult = cartDetail.qty * cartDetail.Product.price;
					result += subResult;
				});
				setTotalCart(result);
			}
		}
		updateTotalCart()
	}, [cart])

	const updateCartDetail = async (event, productId) => {
		const body = {
			ProductId: productId,
			qty: event.target.value,
			isIcrement: false
		}

		await cartDetailService.createCartDetail(body);

		fetchCart();
	}

	const deleteCartDetail = async (id, cartProductName) => {
		if (window.confirm("Are you sure you want to delete this item '" + cartProductName + "'?")) {
			const data = await cartDetailService.deleteCartDetail(id);
			alert(data.message);
			fetchCart();
		} else {
			// return before value
		}
	}

	const createOrder = async () => {
		const body = {
			totalOrder: totalCart
		}

		const data = await orderService.createOrder(body);
		alert(data.message);
		navigate('/order/' + data.data.id);
	}

	return (
		<>
			<Navbar variant="dark" bg="dark" />
			{
				!loading ? (
					<Container>
						<h1 className="mt-3 mb-3">My Cart</h1>
						{cart?.CartDetails.map((cartDetail) =>
							<CartStack key={cartDetail.id} cartDetail={cartDetail}
								inputs={inputs} handleChange={handleChange}
								deleteCartDetail={deleteCartDetail} />)}
						<div>Total: {totalCart}</div>
						<Button variant="primary" onClick={createOrder}>Checkout</Button>
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

export default CartPage;