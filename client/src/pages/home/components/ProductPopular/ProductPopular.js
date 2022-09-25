import { useCallback, useEffect, useState } from "react";
import ProductService from "../../../../services/ProductService";

const productService = new ProductService();

const ProductPopular = () => {
  const [getProductPopular, setGetProductPopular] = useState([]);

  const fetchGetProductPopularHandler = useCallback(async () => {
    try {
      const data = await productService.getProductPopular();
      setGetProductPopular(data.productPopuler);
    } catch (error) {
      // silent e
    }
  }, []);

  useEffect(() => {
    fetchGetProductPopularHandler();
  }, [fetchGetProductPopularHandler]);

  return <div>{getProductPopular}</div>;
};

export default ProductPopular;
