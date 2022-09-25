import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  FormGroup,
} from "react-bootstrap";
import CategoryService from "../../../../services/CategoryService";
import ProductService from "../../../../services/ProductService";

const categoryService = new CategoryService();
const productService = new ProductService();

const UpdateProducts = (props) => {
  const { product, setIsFetching } = props;

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [getCategory, setGetCategory] = useState([]);
  const [enteredProductName, setEnteredProductName] = useState("");
  const [enteredProductPrice, setEnteredProductPrice] = useState("");
  const [enteredProductCategory, setEnteredProductCategory] = useState("");
  const [enteredProductImage, setEnteredProductImage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchGetCategoryHandler = useCallback(async () => {
    try {
      const data = await categoryService.getAllCategories();
      setGetCategory(data.categories);
    } catch (error) {
      // silent e
    }
  }, []);

  useEffect(() => {
    fetchGetCategoryHandler();
  }, [fetchGetCategoryHandler]);

  const updateProductHandler = async (event) => {
    event.preventDefault();

    setIsFetching(false);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    const body = {
      name: enteredProductName === "" ? product.name : enteredProductName,
      price: enteredProductPrice === "" ? product.price : enteredProductPrice,
      CategoryId:
        enteredProductCategory === ""
          ? product.CategoryId
          : enteredProductCategory,
      imagerUrl: enteredProductImage,
    };

    const data = await productService.editProduct(body, product.id);
    alert(data.message);
    setIsFetching(true);

    setValidated(false);
    setShow(false);
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
    <>
      <i
        className="bi bi-pencil-square"
        onClick={handleShow}
        style={{ cursor: "pointer", marginRight: "0.5rem" }}
      />
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={updateProductHandler} validated={validated} noValidate>
          <Modal.Header closeButton>
            <Modal.Title>Form Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup className="my-3">
              <Form.Control
                required
                className="my-3"
                id="productName"
                name="productName"
                placeholder="Product Name"
                type="text"
                onChange={productNameChangeHandler}
                defaultValue={product.name}
              />
              <Form.Control.Feedback type="invalid" className="text-start">
                Please provide a valid product price.
              </Form.Control.Feedback>
            </FormGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="productPrice">Rp</InputGroup.Text>
              <Form.Control
                required
                placeholder="Product Price"
                type="number"
                onChange={productPriceChangeHandler}
                defaultValue={product.price}
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
                  defaultValue={product.CategoryId}
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
