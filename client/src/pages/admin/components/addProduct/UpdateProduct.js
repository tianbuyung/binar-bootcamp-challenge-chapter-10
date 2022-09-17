import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

const UpdateProducts = (props) => {
  const { product } = props;

  const [show, setShow] = useState(false);
  const [getCategory, setGetCategory] = useState([]);
  const [enteredProductName, setEnteredProductName] = useState("");
  const [enteredProductPrice, setEnteredProductPrice] = useState("");
  const [enteredProductCategory, setEnteredProductCategory] = useState("");
  const [enteredProductImage, setEnteredProductImage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    const AddProductRoute = `admin/products/${product.id}`;
    const body = {
      name: enteredProductName === "" ? product.name : enteredProductName,
      price: enteredProductPrice === "" ? product.price : enteredProductPrice,
      CategoryId:
        enteredProductCategory === ""
          ? product.CategoryId
          : enteredProductCategory,
      imagerUrl: enteredProductImage,
    };
    const response = await fetch(API + AddProductRoute, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    alert(data.message);
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
    console.log(event);
  };

  const fileUpload = (event) => {};
  return (
    <>
      <i
        className="bi bi-pencil-square"
        onClick={handleShow}
        style={{ cursor: "pointer", marginRight: "0.5rem" }}
      />
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={addProductHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Form Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              className="my-3"
              id="productName"
              name="productName"
              placeholder="Product Name"
              type="text"
              onChange={productNameChangeHandler}
              defaultValue={product.name}
            />
            <InputGroup className="mb-3">
              <InputGroup.Text id="productPrice">Rp</InputGroup.Text>
              <Form.Control
                placeholder="Product Price"
                type="number"
                onChange={productPriceChangeHandler}
                defaultValue={product.price}
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
                  defaultValue={product.CategoryId}
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
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Upload image"
                type="file"
                onChange={fileChangeHandler}
              />
              <Button onClick={fileUpload}>Upload</Button>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProducts;
