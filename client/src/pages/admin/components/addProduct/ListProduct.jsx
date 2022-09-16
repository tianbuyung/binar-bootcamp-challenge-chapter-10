import { useCallback, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const ListProduct = (props) => {
  const [products, setProducts] = useState([]);

  const API = "http://localhost:4000/";
  const ROUTE = "admin/products";

  const fetchGetCategoryHandler = useCallback(async () => {
    const response = await fetch(API + ROUTE, { method: "GET" });
    const data = await response.json();
    setProducts(data.products);
  }, []);

  useEffect(() => {
    fetchGetCategoryHandler();
  }, [fetchGetCategoryHandler]);

  return (
    <Container>
      <h1>List of Product</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.Category.name}</td>
                <td>For Action</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListProduct;
