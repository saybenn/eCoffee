import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Row, Form, Button, Card, Table } from "react-bootstrap";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Loader from "../components/Loader";
import Message from "../components/Message";
import BlogPost from "../components/BlogPost";
import { updateProfile, getUserProfile, logout } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import {
  UPDATE_PROFILE_RESET,
  USER_PROFILE_RESET,
} from "../constants/userConstants";
import { listMyBlogs } from "../actions/blogActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authorRequest, setAuthorRequest] = useState(null);
  const [message, setMessage] = useState(null);
  const [editState, setEditState] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading: orderLoading, error: orderError } = orderList;

  const myBlogs = useSelector((state) => state.myBlogs);
  const { blogs, loading: blogLoading, error: blogError } = myBlogs;

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout());
      navigate("/login");
    }

    if (!profile || profile.name !== userInfo.name) {
      dispatch(getUserProfile());
    }

    if (!orders) {
      dispatch(listMyOrders());
    }

    if (!blogs) {
      dispatch(listMyBlogs());
    }

    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setAuthorRequest(profile.authorRequest);
    }

    if (success) {
      dispatch({ type: USER_PROFILE_RESET });
      setEditState(false);
    }
  }, [dispatch, userInfo, success, navigate, profile, orders, blogs]);

  const toggleAuthor = () => {
    if (!authorRequest) {
      setAuthorRequest(true);
    } else {
      setAuthorRequest(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    } else {
      dispatch(updateProfile(name, email, password, authorRequest));
      setPassword("");
      setConfirmPassword("");
    }
  };

  const toggleEdit = () => {
    if (!editState) {
      setEditState(true);
    }
    if (editState) {
      setEditState(false);
    }
  };

  return (
    <>
      <Container>
        <Row className="mb-3">
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="alert">{message}</Message>}
          {success && (
            <Message variant="alert">Profile Successfully Updated!</Message>
          )}
          {profile && (
            <Col className="mb-3" md={4}>
              <h2>User Profile</h2>
              <Card className="p-3">
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                    <Form.Label>
                      <strong>Name</strong>
                    </Form.Label>
                    <Form.Control
                      type="name"
                      value={name}
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                      disabled={!editState ? "disabled" : ""}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>
                      <strong>Email</strong>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!editState ? "disabled" : ""}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>
                      <strong>Password</strong>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={!editState ? "disabled" : ""}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>
                      <strong>Confirm Password</strong>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      placeholder="Enter password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={!editState ? "disabled" : ""}
                    ></Form.Control>
                  </Form.Group>
                  <Row>
                    <Col className="mt-3 d-flex align-items-center" md={5}>
                      <Tippy
                        content="The Author role allows users to contribute their own blog post to the community. Requests must be approved by an Administrator."
                        placement="top"
                        arrow={false}
                        delay={300}
                      >
                        <i className="fas fa-info-circle mx-1"></i>
                      </Tippy>
                      {profile && profile.isAuthor ? (
                        <Button variant="success" disabled>
                          Authorized as Author
                        </Button>
                      ) : profile && profile.authorRequest ? (
                        <Button variant="secondary" disabled>
                          Author Role Requested
                        </Button>
                      ) : (
                        <Button
                          onClick={toggleAuthor}
                          variant={authorRequest ? "success" : "info"}
                          disabled={!editState}
                        >
                          Request Author Role
                        </Button>
                      )}
                    </Col>
                    <Col className="mt-3" md={5}>
                      {!editState && (
                        <Button onClick={toggleEdit} variant="primary">
                          Update Profile
                        </Button>
                      )}
                      {editState && (
                        <Button
                          onClick={(toggleEdit, submitHandler)}
                          variant="info"
                        >
                          Submit Update
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Card>{" "}
            </Col>
          )}

          <Col md={8}>
            <h2>My Orders</h2>
            {orders && orders.length > 0 ? (
              <Table
                bordered
                hover
                responsive
                className="table-sm"
                variant="secondary"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ORDER DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer
                            to={
                              !order.isPaid
                                ? `/order/${order._id}`
                                : `/order/review/${order._id}`
                            }
                          >
                            <Button className="btn-sm" variant="outline-dark">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              <Message variant="info">You Have No Orders</Message>
            )}
          </Col>
        </Row>
        <Row>
          <h2>My Blog Post</h2>

          <Col md={6}>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <Row key={blog._id} md={8}>
                  <BlogPost blog={blog} />
                </Row>
              ))
            ) : (
              <Message variant="info">You Have No Blog Posts</Message>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
