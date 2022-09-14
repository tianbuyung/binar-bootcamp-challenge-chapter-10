import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const AddProduct = (props) => {
  const [enteredProductName, setEnteredProductName] = useState("");
  const [enteredProductPrice, setEnteredProductPrice] = useState("");
  const [enteredProductCategory, setEnteredProductCategory] = useState("");

  const addProductHandler = (event) => {
    event.preventDefault();
    console.log(
      enteredProductName,
      enteredProductPrice,
      enteredProductCategory
    );
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
                  <option></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
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
