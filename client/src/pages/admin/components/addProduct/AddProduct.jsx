import { useCallback, useEffect, useState, memo } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
const API = process.env.REACT_APP_SERVER + '/';
const AddProduct = ({ setIsFetching }) => {
  const [validated, setValidated] = useState(false);
  const [getCategory, setGetCategory] = useState([]);
  const [enteredProductName, setEnteredProductName] = useState("");
  const [enteredProductPrice, setEnteredProductPrice] = useState("");
  const [enteredProductCategory, setEnteredProductCategory] = useState("");
  const [enteredProductImage, setEnteredProductImage] = useState("");

  
  const fetchGetCategoryHandler = useCallback(async () => {
    const GetCategoryRoute = "/categories";
    const response = await fetch(API + GetCategoryRoute, { method: "GET" });
    const data = await response.json();
    setGetCategory(data.categories);
  }, [API]);

  useEffect(() => {
    fetchGetCategoryHandler();
  }, [fetchGetCategoryHandler]);

  const addProductHandler = async (event) => {
    event.preventDefault();

    setIsFetching(false);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (
      enteredProductName.trim().length === 0 ||
      enteredProductPrice.trim().length === 0 ||
      enteredProductCategory.trim().length === 0
      // enteredProductImage.trim().length === 0
    ) {
      return alert("Please provide a valid data!");
    }

    const AddProductRoute = "/admin/products";
    const body = {
      name: enteredProductName,
      price: enteredProductPrice,
      CategoryId: enteredProductCategory,
      imagerUrl: enteredProductImage,
    };

    const response = await fetch(API + AddProductRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      alert(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
    setIsFetching(true);

    setEnteredProductName("");
    setEnteredProductPrice("");
    setEnteredProductCategory("");
    setEnteredProductImage("");
    setValidated(false);
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

  const fileChangeHandler = (event) => {
    setEnteredProductImage();
    console.log(event);
  };

  const fileUpload = (event) => {};

  return (
    <Container className="bg-light mt-5" fluid="md">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form onSubmit={addProductHandler} validated={validated} noValidate>
            <h1>Add Product</h1>
            <FormGroup className="my-3">
              <Form.Control
                required
                id="productName"
                name="productName"
                placeholder="Product Name"
                type="text"
                onChange={productNameChangeHandler}
                value={enteredProductName}
              />
              <Form.Control.Feedback type="invalid" className="text-start">
                Please provide a valid product name.
              </Form.Control.Feedback>
            </FormGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="productPrice">Rp</InputGroup.Text>
              <Form.Control
                required
                placeholder="Product Price"
                type="number"
                onChange={productPriceChangeHandler}
                value={enteredProductPrice}
              />
              <Form.Control.Feedback type="invalid" className="text-start">
                Please provide a valid product price.
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Group as={Row} className="mb-3 text-start">
              <Form.Label htmlFor="categorySelect" column md={3}>
                Category
              </Form.Label>
              <Col md={9}>
                <Form.Select
                  required
                  as="select"
                  id="categorySelect"
                  name="categorySelect"
                  type="select"
                  onChange={productCategoryChangeHandler}
                  value={enteredProductCategory}
                >
                  <option value={""}>
                    Please select your product category!
                  </option>
                  {getCategory.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="text-start">
                  Please select a valid product category.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <InputGroup className="mb-3">
              <Form.Control
                // required
                placeholder="Upload image"
                type="file"
                onChange={fileChangeHandler}
              />
              <Form.Control.Feedback
                type="invalid"
                tooltip
                className="text-start"
              >
                Please provide a valid image file.
              </Form.Control.Feedback>
              <Button onClick={fileUpload}>Upload</Button>
            </InputGroup>
            <Button className="mb-3" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(AddProduct);
