import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
  const pageName = "productlist";
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const [deleteState, setDeleteState] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(getProducts("", pageNumber));
    }
    setDeleteState(false);
  }, [
    dispatch,
    deleteState,
    userInfo,
    navigate,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) dispatch(deleteProduct(id));
    setDeleteState(true);
  };

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Paginate
              pages={pages}
              page={page}
              pageName={pageName}
              isAdmin={true}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default ProductListScreen;
