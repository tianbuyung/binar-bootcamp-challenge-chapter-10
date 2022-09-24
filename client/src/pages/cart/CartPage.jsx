import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartDetailService from "../../services/CartDetailService";
import CartService from "../../services/CartService";
import OrderService from "../../services/OrderService";

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
			<h1>Ini CartPage Page</h1>
			{
				!loading ? (
					<>
						<ul>
							{cart.CartDetails.map((cartDetail) => <li key={cartDetail.id}>
								{cartDetail.Product.name}
								<input type="number" className="form-control" placeholder="Qty" min="1"
									id={'qty-' + cartDetail.id} value={inputs['qty-' + cartDetail.id] || cartDetail.qty}
									onChange={(event) => handleChange(event, cartDetail.ProductId, cartDetail.Product.name)} />
								<button className="btn btn-danger" type="button"
									onClick={() => deleteCartDetail(cartDetail.id, cartDetail.Product.name)}>
									<i className="bi-trash"></i>
								</button>
							</li>)}
						</ul>
						Total: {totalCart}
						<button type="button" className="btn btn-primary" onClick={createOrder}>Checkout</button>
					</>
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