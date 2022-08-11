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
          <Carousel.Item interval={5000} key={product._id}>
            <Link
              className="flex justify-between"
              to={`/product/${product._id}`}
            >
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col
                className="carousel-right flex flex-col justify-center"
                md={7}
              >
                <h2 className="font-semibold text-2xl">{product.name}</h2>
                <h4 className="font-medium text-xl mt-1 ">${product.price}</h4>
                <p className="my-2 text-xl">{product.description}</p>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </Col>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default TopProductsCarousel;
