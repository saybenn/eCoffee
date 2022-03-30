import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PortalScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Row className="portalRow">
      <Col className="d-flex flex-column sidebar bg-primary" md={1}>
        <div>
          <Link to="/">
            {" "}
            <i className="fa-solid fa-house"></i>
          </Link>
          <div className="tab"></div>
        </div>
        <div>
          <Link to={userInfo ? "/profile" : "/login"}>
            <i className="fa-solid fa-user"></i>{" "}
          </Link>
        </div>
        <div>
          <Link to="/shop">
            <i className="fa-solid fa-bag-shopping"></i>{" "}
          </Link>
        </div>
        <div>
          <Link to="/blog">
            <i className="fa-solid fa-book"></i>{" "}
          </Link>
        </div>
        <div>
          <Link to="/about">
            <i className="fa-solid fa-chalkboard-user"></i>{" "}
          </Link>
        </div>
        <div>
          <Link to="/contact">
            <i className="fa-solid fa-envelope"></i>{" "}
          </Link>
        </div>
      </Col>
      <Col className=" portal-body" xs={12} sm={12} md={8}>
        <Link to="/">
          <div className="portal-icon-body">
            <i className="portal-icon fa-solid fa-mug-hot"></i>{" "}
            <div>
              <h1>eCo</h1>
            </div>
            <div>
              <h3>Coffee Shop meets Blog Spot</h3>
            </div>
          </div>
        </Link>
      </Col>
    </Row>
  );
};

export default PortalScreen;
