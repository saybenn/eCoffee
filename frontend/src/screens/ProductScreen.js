import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Image,
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Container from "../components/Container";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createReview, getProductDetails } from "../actions/productActions";
import { addItemToCart } from "../actions/cartActions";
import { ADD_CART_RESET } from "../constants/cartConstants";
const ProductScreen = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [options, setOptions] = useState("");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReview = useSelector((state) => state.productReview);
  const { error: errorReview, success: reviewSuccess } = productReview;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const cartAdd = useSelector((state) => state.cartAdd);
  const { error: cartError, success } = cartAdd;

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (reviewSuccess) {
      dispatch(getProductDetails(id));
    }
    if (cartError) {
      setMessage(
        `There was a problem adding ${product.name} to your cart. Try again or check if you are logged in.`
      );
      setTimeout(() => {
        setMessage(false);
        dispatch({ type: ADD_CART_RESET });
      }, 3000);
    }
  }, [dispatch, cartError, reviewSuccess, product.name, id]);

  const addToCartHandler = () => {
    if (product.optionName && !options) {
      setMessage(`Please select ${product.optionName}`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    } else {
      dispatch(
        addItemToCart(
          product.name,
          product.price,
          product.image,
          product._id,
          qty,
          options,
          product.optionName
        )
      );
      setMessage(`${product.name} has been added to your cart.`);
      setTimeout(() => {
        setMessage(false);
      }, 3500);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(id, rating, comment));
    setComment("");
    setRating(0);
  };

  return (
    <>
      <Container>
        <Link to="/shop" className="btn btn-dark my-3">
          Back
        </Link>
        {message && <Message variant="info">{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {product && (
          <>
            <Row className="flex ">
              <Col md={5}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="mb-3"
                  fluid
                />
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />{" "}
              </Col>

              <Col md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <h2> {product.name}</h2>
                    </Card.Title>
                    <Card.Subtitle className="mb-2">
                      <h4>${product.price}</h4>
                    </Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                  <ListGroupItem>
                    <Row className="mt-2 align-items-center">
                      <Col sm={product.optionName ? 3 : 5} md={5}>
                        <strong>Status:</strong>{" "}
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                      {product.optionName && (
                        <Col
                          md={7}
                          sm={3}
                          className="d-flex align-items-center xs:my-5"
                        >
                          <strong className="mx-1">{`${product.optionName}: `}</strong>

                          <Form.Control
                            className="m-0"
                            value={options}
                            as="select"
                            onChange={(e) => setOptions(e.target.value)}
                          >
                            <option value="caution">Select a Value</option>
                            {product.options.map((o) => (
                              <option key={o++} value={o}>
                                {o}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      )}
                      <Col className=" flex items-center" md={5} sm={3}>
                        <strong className="mx-1">Qty:</strong>{" "}
                        <Form.Control
                          className="m-0"
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col
                        xl={product.optionName ? 7 : 3}
                        md={7}
                        sm={product.optionName ? 3 : 4}
                        className="sm:my-3 xs:my-5 flex-col items-center justify-center"
                      >
                        <Button
                          className=" btn btn-dark w-100"
                          onClick={addToCartHandler}
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={11} sm={12}>
                <h2 className="my-3">Reviews</h2>
                {product.reviews.length === 0 ? (
                  <Message variant="info">No Reviews</Message>
                ) : (
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <Row className="justify-space-between">
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                      </Row>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))
                )}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="secondary">
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
