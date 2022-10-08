import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import BreadcrumbComponent from "../../components/breadcrumbs/BreadCrumbs";
import Navbar from "../../components/navbar";
import "./style.css";
import useProductListPage from "./useProductListPage";

const NO_IMAGE =
	"https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg";
const ProductListPage = () => {
	const { products, totalPage, page, setPage, loading } =
		useProductListPage();
	const navigate = useNavigate();
	const breadcrumbs = [
		{ title: "Home", isActive: false, href: "/" },
		{ title: products[0]?.Category?.name, isActive: true },
	];
	return (
		<>
			<Navbar variant="dark" bg="dark" />
			{!loading ? (
				<Container>
					<BreadcrumbComponent data={breadcrumbs} />
					<Row
						md={5}
						xs={3}
						className={"justify-content-between"}
					>
						{products?.map((p) => (
							<Col
								onClick={() =>
									navigate(`/product/${p?.id}`)
								}
								className="cursor-pointer"
								key={p?.id}
								class="mb-2 pb-1"
							>
								<Card
									style={{
										width: "100%",
										height: "400px",
									}}
								>
									<Card.Img
										variant="top"
										src={p?.image || NO_IMAGE}
									/>
									<Card.Body>
										<Card.Title>
											{p?.name}
										</Card.Title>
										<Card.Text>
											Category:{" "}
											{p?.Category?.name}
										</Card.Text>
										<Card.Text>
											Price: Rp. {p?.price}K
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
					<ReactPaginate
						breakLabel="..."
						nextLabel="next >"
						onPageChange={({ selected }) =>
							setPage(selected + 1)
						}
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
			) : (
				<Container>
					<BreadcrumbComponent data={breadcrumbs} />
					<Row md={5} xs={3}>
						{Array.from(new Array(5)).map((_, i) => (
							<Col>
								<Card
									style={{
										width: "100%",
										height: "400px",
									}}
								>
									<Card.Img
										variant="top"
										src={NO_IMAGE}
									/>
									<Card.Body>
										<Placeholder
											as={Card.Title}
											animation="glow"
										>
											<Placeholder
												md={12}
												size="lg"
											/>
										</Placeholder>
										<Placeholder
											as={Card.Text}
											animation="glow"
										>
											<Placeholder
												lg={8}
												size="md"
											/>
										</Placeholder>
										<Placeholder
											as={Card.Text}
											animation="glow"
										>
											<Placeholder
												lg={6}
												size="md"
											/>
										</Placeholder>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			)}
		</>
	);
};

export default ProductListPage;
