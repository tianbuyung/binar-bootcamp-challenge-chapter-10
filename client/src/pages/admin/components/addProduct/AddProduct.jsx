import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

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
            <Input
              className="my-3"
              id="productName"
              name="productName"
              placeholder="Product Name"
              type="text"
              onChange={productNameChangeHandler}
              value={enteredProductName}
            />
            <InputGroup className="mb-3">
              <InputGroupText>Rp</InputGroupText>
              <Input
                placeholder="Product Price"
                type="number"
                onChange={productPriceChangeHandler}
                value={enteredProductPrice}
              />
            </InputGroup>
            <FormGroup row className="mb-3">
              <Label for="categorySelect" md={3}>
                Category
              </Label>
              <Col md={9}>
                <Input
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
                </Input>
              </Col>
            </FormGroup>
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
