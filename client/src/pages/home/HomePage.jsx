import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Navbar from "../../components/navbar";
import CategoryService from "../../services/CategoryService";

const categoryService = new CategoryService();

const HomePage = () => {
  const [getCategory, setGetCategory] = useState([]);

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

  return (
    <div>
      <Navbar />
      <Container>
        <h2 className="text-start h2">Jelajahi Produk Kami</h2>
        <ul>
          {getCategory.map((category) => {
            return (
              <div key={category.id}>
                <h1>{category.name}</h1>
                <Row xs={1} md={5} className="g-4">
                  {category.Products.slice(0, 5).map((product) => (
                    <Col key={product.id}>
                      <Card style={{ height: "400px" }}>
                        <Card.Img
                          variant="top"
                          src="https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg"
                        />
                        <Card.Body>
                          <Card.Title>{product.name}</Card.Title>
                          <Card.Text>Price: Rp. {product.price}K</Card.Text>
                          <Button variant="success">Beli</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};

export default HomePage;
