import { useEffect } from "react";
import { useState } from "react";
import ProductService from "../../services/ProductService";
const productService = new ProductService();
const useProductDetailPage = ({ id }) => {
    const [product, setProduct] = useState();
    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await productService.getProductDetailUser(id)
                setProduct(data.product)
            } catch (error) {
                console.log('error', error)
                //
            }
        }
        getProduct();
    }, [])
    return {
        product
    }
}

export default useProductDetailPage;