import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { payOrder } from "../actions/orderActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippy.js/react";

const CheckoutForm = ({ clientSecret, id }) => {
  //Hooks
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Stripe
  const stripe = useStripe();
  const elements = useElements();

  //useEffect
  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }

    if (success) {
      setTimeout(() => {
        navigate(`/order/review/${id}`);
      }, 3500);
    }
  }, [stripe, success, clientSecret, id, navigate]);

  //Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    //disable redirect on confirmPayment
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    //Check payment status, set Order Pay on success
    stripe.retrievePaymentIntent(clientSecret).then(function (response) {
      if (
        response.paymentIntent &&
        response.paymentIntent.status === "succeeded"
      ) {
        setMessage("Payment Succeeded");
        setSuccess(true);
        dispatch(payOrder(id, "Stripe"));
      } else {
        setMessage("Something went wrong");
      }
    });

    setIsLoading(false);
  };

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <Form.Label as="legend">
        Stripe Secure Payments
        <Tippy
          content="Stripe Test Card Number is 4242 4242 4242 4242. Any Expiration date in the future is allowed, as is any CVC or Zip Code. Happy shopping!"
          placement="top"
          arrow={false}
          delay={300}
        >
          <i className="fas fa-info-circle mx-1"></i>
        </Tippy>
      </Form.Label>

      <hr />
      <PaymentElement id="payment-element" />
      <Button
        className="my-3"
        variant="primary"
        disabled={isLoading || !stripe || !elements || success}
        type="submit"
      >
        Pay Here
      </Button>
      {isLoading && <Loader />}
      {message && <Message id="payment-message">{message}</Message>}
    </Form>
  );
};

export default CheckoutForm;
