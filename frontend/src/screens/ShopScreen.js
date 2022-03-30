import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Container from "../components/Container";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { getProducts } from "../actions/productActions";
const ShopScreen = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Container>
        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="mb-3">
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                  <Product product={product} />
                </Col>
              ))}{" "}
          </Row>
        )}

        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </Container>
    </>
  );
};

export default ShopScreen;
