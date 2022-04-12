import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrder, deliverOrder } from "../actions/orderActions";
import { DELIVER_ORDER_RESET } from "../constants/orderConstants";
import { logout } from "../actions/userActions";

const OrderScreen = () => {
  const [sent, setSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout());
      navigate("/login");
    }
    dispatch(getOrder(id));
    if (successDeliver) {
      dispatch({ type: DELIVER_ORDER_RESET });
      dispatch(getOrder(id));
    }
  }, [dispatch, navigate, id, successDeliver, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const receiptHandler = async () => {
    setSent(true);
    try {
      await axios.post("/send_thankyou", {
        order,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        {sent && (
          <Message variant="success">Receipt was sent to your email</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {order && (
          <>
            <h1 className="orderId">Order: {order._id}</h1>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {order.user.email}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress.address}{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.postalCode}
                      {", "}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <Message variant="success">
                        Delivered on {order.deliveredAt.slice(0, 10)}
                      </Message>
                    ) : (
                      <Message variant="danger">Order is not delivered</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Message variant="success">
                        Paid on {order.paidAt.slice(0, 10)}
                      </Message>
                    ) : (
                      <Message variant="danger">Order is not paid.</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty!</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col md={3}>
                                <Link to={`/product/${item.productId}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={2}>Qty: {item.qty}</Col>
                              <Col md={2}>Price: ${item.price}</Col>
                              <Col md={4}>
                                Total: {item.qty} * ${item.price} = $
                                {`${(item.qty * item.price).toFixed(2)}`}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button onClick={receiptHandler} variant="dark">
                        Email Receipt
                      </Button>
                    </ListGroup.Item>
                    {loadingDeliver && <Loader />}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <ListGroup.Item>
                          <Button
                            type="button"
                            className="btn btn-block"
                            onClick={deliverHandler}
                          >
                            {" "}
                            Mark As Delivered
                          </Button>
                        </ListGroup.Item>
                      )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default OrderScreen;
