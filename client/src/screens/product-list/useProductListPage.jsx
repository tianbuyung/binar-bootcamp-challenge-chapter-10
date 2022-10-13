import { useState, useEffect } from "react";
import CategoryService from "../../services/CategoryService";
const categoryService = new CategoryService();
const SIZE = 8;
const useProductListPage = ({ query: queryProps }) => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	useEffect(() => {
		const getCategoryProducts = async () => {
			try {
				const query = `${queryProps?.slug}?page=${page}&size=${SIZE}`;
				const result = await categoryService.getProductsCategories({
					query,
				});
				setTotalPage(result?.data?.totalPage);
				setProducts(result?.data?.rows);
			} catch (error) {
				//
			}
		};
		if (page) {
			getCategoryProducts();
		}
	}, [page]);
	return {
		products,
		page,
		setPage,
		totalPage,
	};
};

export default useProductListPage;
