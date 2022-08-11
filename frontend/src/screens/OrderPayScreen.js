import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import {
  Button,
  Form,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { getOrder, payOrder } from "../actions/orderActions";
import { logout } from "../actions/userActions";

const stripePromise = loadStripe(
  "pk_test_51KfRvoCiXm4UN3ie2rCe8bQxPrNDY3Fck0a33xKG8NlkqieYNBmUcd26Wu1DdKA9lrGZrDLBIPx7UhxBvVErUaEs00F5dPdgJD"
);
const PlaceOrderScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [sdkReady, setSdkReady] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, shippingAddress, error } = orderDetails;

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout());
      navigate("/login");
    }
    dispatch(getOrder(id));

    async function stripeHandler() {
      const name = order.user.name;
      const email = order.user.email;
      const { data } = await axios.post("/create-payment-intent", {
        id,
        name,
        email,
      });
      setClientSecret(data.clientSecret);
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
      setSdkReady(true);
    };
    if (paymentMethod === "Stripe") {
      stripeHandler();
    }
    if (paymentMethod === "PayPal") {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [dispatch, id, userInfo, paymentMethod, sdkReady]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const successPaymentHandler = () => {
    dispatch(payOrder(id, paymentMethod));
  };

  return (
    <>
      {order && (
        <Container>
          <CheckoutSteps step1 step2 step3 id={id} />
          <Row>
            <Col md={8}>
              <h2>Order Items</h2>
              <Card className="p-3">
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="d-flex justify-content-between align-items-center">
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            sm={1}
                          />
                        </Col>
                        <Col md={2}>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={1}>{item.qty}</Col>

                        <Col className="" md={2}>
                          {item.totalPrice
                            ? `$${item.totalPrice.toFixed(2)}`
                            : `$${item.price.toFixed(2)}`}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={4}>
              <h2>Order Summary</h2>
              <Card className="p-3">
                <ListGroup variant="flush">
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
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-5">
            <Col md={8}>
              <h2>Shipping Information</h2>
              <Card className="p-3">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {order.user.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>email:</strong> {order.user.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Shipping Address:</strong>
                    {` ${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.state} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={4}>
              <h2>Payment Method</h2>
              <Card className="p-3">
                {!paymentMethod ? (
                  <ListGroup variant="flush">
                    <Form.Check
                      type="radio"
                      label="Paypal"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                      type="radio"
                      label="Stripe/Credit Card"
                      id="Stripe"
                      name="paymentMethod"
                      value="Stripe"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Button type="submit" variant="primary">
                      Continue
                    </Button>
                  </ListGroup>
                ) : paymentMethod === "PayPal" && sdkReady ? (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                ) : (
                  paymentMethod === "Stripe" &&
                  clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm clientSecret={clientSecret} id={id} />
                    </Elements>
                  )
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PlaceOrderScreen;
