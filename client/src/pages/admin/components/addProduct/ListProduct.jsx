import { useCallback, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import UpdateProducts from "./UpdateProduct";

const ListProduct = (props) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const API = "http://localhost:4000/";

  const fetchGetProductsHandler = useCallback(async (query) => {
    const GetListProductRoute = "admin/products";
    const response = await fetch(API + GetListProductRoute + query, {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data?.products);
    setCurrentPage(data?.currentPage);
    setTotalPage(data?.totalPages);
  }, []);

  useEffect(() => {
    fetchGetProductsHandler(`?page=${currentPage}`);
  }, [fetchGetProductsHandler, currentPage]);

  const handlePageClick = (value) => {
    setCurrentPage(value.selected + 1);
  };

  const handleDelete = async (id) => {
    const DeleteProductRoute = `admin/products/${id}`;
    const response = await fetch(API + DeleteProductRoute, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <Container>
      <h1>List of Product</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td className="text-start">{product.name}</td>
                <td>{product.price}</td>
                <td>{product.Category.name}</td>
                <td>
                  <UpdateProducts product={product} setProducts={setProducts} />
                  |
                  <i
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    onClick={() => handleDelete(product.id)}
                    className="bi bi-trash3-fill"
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </Container>
  );
};

export default ListProduct;
