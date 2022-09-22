import { useState } from "react";
import { useEffect } from "react";

const CartPage = () => {
	const [loading, setLoading] = useState(true);
	const [cart, setCart] = useState();

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
			console.log(data.data);
		}
	}

	// update

	const deleteCartDetail = async (id, cartProductName) => {
		if (window.confirm("Are you sure you want to delete this item '" + cartProductName + "'?")) {
			const response = await fetch(
				process.env.REACT_APP_SERVER + "/carts/" + id, { method: 'DELETE' }
			);

			if (!response.ok) {
				alert(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				alert(data.message);
				fetchCart();
			}
		}
	}

	return (
		<>
			<h1>Ini CartPage Page</h1>
			{
				!loading ? (
					<ul>
						{cart.CartDetails.map((cartDetail) => <li key={cartDetail.id}>{cartDetail.Product.name} <button className="btn btn-outline-secondary" type="button" onClick={() => deleteCartDetail(cartDetail.id, cartDetail.Product.name)}><i className="bi-trash"></i></button></li>)}
					</ul>
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