import { useEffect } from "react";
import { useState } from "react";
import ProductService from "@services/ProductService";
import { ProductProps } from "@interfaces/ProductInterfaces";

const productService = new ProductService();

interface ProductDetailHooksProps {
  id: string;
}

const useProductDetailPage = ({ id }: ProductDetailHooksProps) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await productService.getProductDetailUser(id);
        setProduct(data.product);
      } catch (error) {
        console.log("error", error);
        //
      }
    };
    getProduct();
  }, []);
  return {
    product,
  };
};

export default useProductDetailPage;
