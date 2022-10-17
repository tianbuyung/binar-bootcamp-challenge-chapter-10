import useProductListPage from "./useProductListPage";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import BreadcrumbComponent from "@components/breadcrumbs/BreadCrumbs";
import Navbar from "@components/navbar";
import ReactPaginate from "react-paginate";
import Link from "next/link";

const NO_IMAGE =
  "https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg";
const ProductListPage = ({ query }) => {
  const { products, totalPage, page, setPage } = useProductListPage({ query });
  // const navigate = useNavigate()
  const breadcrumbs = [
    { title: "Home", isActive: false, href: "/" },
    { title: products[0]?.Category?.name, isActive: true },
  ];
  return (
    <>
      <Navbar variant="dark" bg="dark" />
      <Container>
        <BreadcrumbComponent data={breadcrumbs} baseColor="black" />
        <Row>
          {products?.map((p) => (
            <Col className="cursor-pointer" key={p?.id} xs={3}>
              <Link
                as={`/product/${p.id}`}
                href="/product/[slug]"
                className="text-black text-decoration-none"
              >
                <Card style={{ width: "100%" }}>
                  <Card.Img variant="top" src={p?.image || NO_IMAGE} />
                  <Card.Body>
                    <Card.Title>{p?.name}</Card.Title>
                    <Card.Text>Category: {p?.Category?.name}</Card.Text>
                    <Card.Text>Price: Rp. {p?.price}K</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={({ selected }) => setPage(selected + 1)}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel="< previous"
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </Container>
    </>
  );
};
ProductListPage.getInitialProps = async ({ query }, screen) => {
  return {
    query,
  };
};

export default ProductListPage;
