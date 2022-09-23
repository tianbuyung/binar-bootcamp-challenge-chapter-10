import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
		const response = await fetch(
			process.env.REACT_APP_SERVER + "/carts/", { method: 'GET' }
		)

		if (!response.ok) {
			setLoading(false);
			alert(`HTTP error! status: ${response.status}`);
		} else {
			const data = await response.json();
			setCart(data.data);
			setLoading(false);
		}
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
		const response = await fetch(
			process.env.REACT_APP_SERVER + "/cartDetails/", {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				ProductId: productId,
				qty: event.target.value
			})
		});

		if (!response.ok) {
			alert(`HTTP error! status: ${response.status}`);
		} else {
			fetchCart();
		}
	}

	const deleteCartDetail = async (id, cartProductName) => {
		if (window.confirm("Are you sure you want to delete this item '" + cartProductName + "'?")) {
			const response = await fetch(
				process.env.REACT_APP_SERVER + "/cartDetails/" + id, { method: 'DELETE' }
			);

			if (!response.ok) {
				alert(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				alert(data.message);
				fetchCart();
			}
		} else {
			// return before value
		}
	}

	const createOrder = async () => {
		const response = await fetch(
			process.env.REACT_APP_SERVER + "/orders/", {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				totalOrder: totalCart
			})
		});

		if (!response.ok) {
			alert(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			console.log(data);
		} else {
			const data = await response.json();
			alert(data.message);
			navigate('/order/' + data.data.id);
		}
	}



	return (
		<>
			<h1>Ini CartPage Page</h1>
			{
				!loading ? (
					<>
						<ul>
							{cart?.CartDetails.map((cartDetail) => <li key={cartDetail.id}>
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