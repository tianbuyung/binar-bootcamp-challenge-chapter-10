import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
const categoryService = new CategoryService()
const SIZE = 8;
const useProductListPage  = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const { id } = useParams()
    useEffect(() => {
        const getCategoryProducts = async () => {
            try {
                const query =  `${id}?page=${page}&size=${SIZE}`
                const result = await categoryService.getProductsCategories({ query })
                setTotalPage(result?.data?.totalPage)
                setProducts(result?.data?.rows)
            } catch (error) {
                //
            }
        }
        if(page) {
            getCategoryProducts()
        }
       
    }, [page])
    return {
        products,
        page,
        setPage,
        totalPage,
    }
}

export default useProductListPage;