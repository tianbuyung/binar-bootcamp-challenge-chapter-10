import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const AddProduct = (props) => {
  const [getCategory, setGetCategory] = useState([]);
  const [enteredProductName, setEnteredProductName] = useState("");
  const [enteredProductPrice, setEnteredProductPrice] = useState("");
  const [enteredProductCategory, setEnteredProductCategory] = useState("");

  const API = "http://localhost:4000/";
  const ROUTE = "categories";

  const fetchGetCategoryHandler = useCallback(async () => {
    const response = await fetch(API + ROUTE, { method: "GET" });
    const data = await response.json();
    setGetCategory(data.categories);
  }, []);

  useEffect(() => {
    fetchGetCategoryHandler();
  }, [fetchGetCategoryHandler]);

  const addProductHandler = async (event) => {
    event.preventDefault();
    const AddProductRoute = "admin/products";
    const body = {
      name: enteredProductName,
      price: enteredProductPrice,
      CategoryId: enteredProductCategory,
    };
    const response = await fetch(API + AddProductRoute, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    alert(data.message);
    setEnteredProductName("");
    setEnteredProductPrice("");
    setEnteredProductCategory("");
  };

  const productNameChangeHandler = (event) => {
    setEnteredProductName(event.target.value);
  };

  const productPriceChangeHandler = (event) => {
    setEnteredProductPrice(event.target.value);
  };

  const productCategoryChangeHandler = (event) => {
    setEnteredProductCategory(event.target.value);
  };

  return (
    <Container className="bg-light mt-5" fluid="md">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form onSubmit={addProductHandler}>
            <h1>Add Product</h1>
            <Form.Control
              className="my-3"
              id="productName"
              name="productName"
              placeholder="Product Name"
              type="text"
              onChange={productNameChangeHandler}
              value={enteredProductName}
            />
            <InputGroup className="mb-3">
              <InputGroup.Text id="productPrice">Rp</InputGroup.Text>
              <Form.Control
                placeholder="Product Price"
                type="number"
                onChange={productPriceChangeHandler}
                value={enteredProductPrice}
              />
            </InputGroup>
            <Form.Group as={Row} className="mb-3 text-start">
              <Form.Label htmlFor="categorySelect" column md={3}>
                Category
              </Form.Label>
              <Col md={9}>
                <Form.Select
                  id="categorySelect"
                  name="categorySelect"
                  type="select"
                  onChange={productCategoryChangeHandler}
                  value={enteredProductCategory}
                >
                  <option>Please select your product category!</option>
                  {getCategory.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Form.Group>
            <Button className="mb-3" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
