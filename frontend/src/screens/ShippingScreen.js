import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { getUserProfile, saveShippingAddress } from "../actions/userActions";
import {
  ORDER_CREATE_RESET,
  ORDER_DETAILS_RESET,
} from "../constants/orderConstants";
import { createOrder, updateOrder } from "../actions/orderActions";
import Message from "../components/Message";
import { USER_PROFILE_RESET } from "../constants/userConstants";

const ShippingScreen = () => {
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, order } = orderCreate;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order: detailsOrder } = orderDetails;

  useEffect(() => {
    if (!profile || profile.cartItems.length === 0) {
      dispatch(getUserProfile());
    } else {
      setAddress(profile.shippingAddress.address);
      setState(profile.shippingAddress.state);
      setCity(profile.shippingAddress.city);
      setPostalCode(profile.shippingAddress.postalCode);
      setCountry(profile.shippingAddress.country);
    }

    if (order && !detailsOrder) {
      navigate(`/order/${order._id}`);
    }
  }, [dispatch, profile, order]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(address, city, state, postalCode, country));
    if (!order) {
      dispatch(createOrder(profile));
    }

    if (detailsOrder) {
      dispatch(
        updateOrder(detailsOrder._id, {
          address,
          city,
          state,
          postalCode,
          country,
        })
      );
      navigate(`/order/${detailsOrder._id}`);
    }
  };
  return (
    <>
      <Container>
        <FormContainer>
          {error && <Message variant="danger">{error}</Message>}
          <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Card className="p-3">
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  placeholder="Enter address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  placeholder="Enter city"
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Select
                  value={state}
                  placeholder="Enter state"
                  required
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  value={postalCode}
                  placeholder="Enter postal code"
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  value={country}
                  placeholder="Enter country"
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Continue
              </Button>
            </Form>
          </Card>
        </FormContainer>
      </Container>
    </>
  );
};

export default ShippingScreen;
