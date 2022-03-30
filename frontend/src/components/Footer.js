import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-primary">
      <Container>
        <Row className="py-3 footer">
          <Col className="text-center">
            <Nav className="justify-content-start">
              <Nav.Item>
                <Nav.Link className="nav-links" href="/contact">
                  Contact Us
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="text-center"> &copy; 2021 eCo</Col>
          <Col className="text-center ">
            <Nav className="justify-content-end">
              <Nav.Item>
                <Nav.Link
                  className="nav-links"
                  href="https://instagram.com"
                  target="_blank"
                >
                  <i className="fab fa-2x fa-instagram"></i>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="nav-links"
                  href="https://twitter.com"
                  target="_blank"
                >
                  <i className="fab fa-2x fa-twitter"></i>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="nav-links"
                  href="https://facebook.com"
                  target="_blank"
                >
                  <i className="fab fa-2x fa-facebook"></i>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
