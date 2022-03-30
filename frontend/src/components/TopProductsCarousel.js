import React, { useEffect } from "react";
import { Carousel, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTopProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";

const TopProductsCarousel = () => {
  const dispatch = useDispatch();

  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products } = topProducts;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      pause="hover"
      controls={false}
      className="mb-5 product-carousel"
      variant="dark"
      indicators={false}
    >
      {products.map((product) => {
        return (
          <Carousel.Item key={product._id}>
            <Link className="d-flex" to={`/product/${product._id}`}>
              <Col md={4}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col className="carousel-right d-flex align-items-center" md={8}>
                <div>
                  <h2>{product.name}</h2>
                  <h4>${product.price}</h4>
                  <p>{product.description}</p>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
              </Col>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default TopProductsCarousel;
