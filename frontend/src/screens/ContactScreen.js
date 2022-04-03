import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Row, Button } from "react-bootstrap";
import Container from "../components/Container";
import Message from "../components/Message";

const ContactScreen = () => {
  const [name, setName] = useState("");
  const [sent, setSent] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");

  const handleSend = async () => {
    setSent(true);
    try {
      await axios.post("/send_mail", {
        name,
        text,
        email,
        subject,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Row className="my-3 justify-content-center text-center">
          <h1>Contact Us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla
            numquam!
            <br /> Deserunt cupiditate nobis iusto?
          </p>
        </Row>
        <Row className="my-3 d-flex justify-content-center">
          {" "}
          {!sent ? (
            <Card className="p-4 w-50">
              <Form onSubmit={handleSend}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="text">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button className="my-1" type="submit" variant="dark">
                  Send Message
                </Button>
              </Form>
            </Card>
          ) : (
            <Message variant="success">
              Email Received! We'll get back to you as soon!
            </Message>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ContactScreen;
