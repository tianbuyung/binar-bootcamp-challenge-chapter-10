import { useEffect } from "react";
import { useState } from "react";

import ProductService from "../../services/ProductService";
import { ProductProps } from "../../interfaces/ProductInterfaces";
const productService = new ProductService();

interface ProductDetailHooksProps {
    id: string,
    // loading: boolean
}


const useProductDetailPage = ({ id } : ProductDetailHooksProps) => {
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await productService.getProductDetailUser(id)
                setProduct(data.product)
                setLoading(false);
            } catch (error) {
                console.log('error', error)
            }
        }
        getProduct();
    }, [])
    return {
        product,
        loading
    }
}

export default useProductDetailPage;