import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import CategoryService from "../../services/CategoryService";

const categoryService = new CategoryService();

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [getCategory, setGetCategory] = useState([]);

  const fetchGetCategoryHandler = useCallback(async () => {
    try {
      const data = await categoryService.getAllCategories();
      setGetCategory(data.categories);
      setLoading(false);
    } catch (error) {
      // silent e
    }
  }, []);

  useEffect(() => {
    fetchGetCategoryHandler();
  }, [fetchGetCategoryHandler]);

  return (
    <div>
      <Navbar variant={"dark"} bg={"dark"} />
      <Container>
        {!loading ? (
          <>
            <h2 className="text-start h2 mt-3">Jelajahi Produk Kami</h2>
            {getCategory?.map((category) => {
              return (
                <div
                  className="my-3 p-3 bg-secondary rounded"
                  key={category.id}
                >
                  <Row className="align-items-center">
                    <Col lg={2} xl={2} className="text-start text-white">
                      <h3>{category.name}</h3>
                    </Col>
                    <Col lg={"auto"} xl={"10"}>
                      <Row>
                        <Col className="text-end my-3">
                          <Link
                            className="text-white text-decoration-none"
                            to={`/product/category/${category.id}`}
                          >
                            Lihat Semua
                          </Link>
                        </Col>
                      </Row>
                      <Row xs={1} md={5} className="g-4">
                        {category?.Products?.slice(0, 5).map((product) => (
                          <Col key={product.id}>
                            <Link
                              to={`product/${product.id}`}
                              className="text-black text-decoration-none"
                            >
                              <Card
                                style={{
                                  height: "400px",
                                }}
                              >
                                <Card.Img
                                  variant="top"
                                  src="https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg"
                                />
                                <Card.Body>
                                  <Card.Title>{product.name}</Card.Title>
                                  <Card.Text>
                                    Price: Rp. {product.price}K
                                  </Card.Text>
                                  <Button variant="success">Details</Button>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
