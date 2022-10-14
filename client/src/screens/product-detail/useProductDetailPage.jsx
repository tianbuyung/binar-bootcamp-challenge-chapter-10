import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";

const productService = new ProductService();
const useProductDetailPage = ({ id }) => {
	const [product, setProduct] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getProduct = async () => {
			try {
				const data = await productService.getProductDetailUser(id);
				setProduct(data.product);
				setLoading(false);
			} catch (error) {
				console.log("error", error);
				//
			}
		};
		getProduct();
	}, []);
	return {
		product,
		loading,
	};
};

export default useProductDetailPage;
