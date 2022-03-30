import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Button, Modal, Form, Toast } from "react-bootstrap";
import {
  commentBlog,
  deleteCommentBlog,
  likeBlog,
  deleteBlogPost,
} from "../actions/blogActions";
import FormContainer from "./FormContainer";
import { Link } from "react-router-dom";

const BlogPost = ({ blog }) => {
  const [message, setMessage] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [viewCommentShow, setViewCommentShow] = useState(false);
  const [createCommentShow, setCreateCommentShow] = useState(false);
  const [comment, setComment] = useState("");

  const handleViewCommentClose = () => setViewCommentShow(false);
  const handleViewCommentShow = () => setViewCommentShow(true);

  const handleCreateCommentClose = () => setCreateCommentShow(false);
  const handleCreateCommentShow = () => setCreateCommentShow(true);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const likeHandler = () => {
    if (!userInfo) {
      setToastShow(true);
      setMessage(`Must be logged in to leave a like`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    } else {
      dispatch(likeBlog(blog._id));
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) dispatch(deleteBlogPost(id));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInfo) {
      setToastShow(true);

      setMessage(`Must be logged in to leave a comment`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    } else {
      dispatch(commentBlog(comment, blog._id));
    }
  };

  return (
    <Card className="mb-3" key={blog._id}>
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => setToastShow(false)}
            show={toastShow}
            delay={3000}
            autohide
          >
            <Toast.Header>{message}</Toast.Header>
          </Toast>
        </Col>
      </Row>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md={10}>
              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            </Col>

            {userInfo && userInfo._id === blog.user && (
              <Col className="d-flex justify-content-end" md={2}>
                <Button
                  variant="outline-dark delete-btn"
                  onClick={() => deleteHandler(blog._id)}
                >
                  <i
                    style={{ color: "red" }}
                    className="text-right fas fa-2x fa-times"
                  ></i>
                </Button>
              </Col>
            )}
          </Row>
        </Card.Title>

        <Card.Subtitle className="text-muted mb-2">
          {`${blog.author} - ${blog.createdAt.toString().substring(0, 10)}`}
        </Card.Subtitle>
        <Card.Text>
          <Link to={`/blog/${blog._id}`}>
            {blog.description.length > 250
              ? `${blog.description.substring(0, 50)} ...Read More`
              : blog.description}
          </Link>
        </Card.Text>
        <Row>
          <Col md={2}>
            {userInfo && blog.likes.find((l) => l.userid === userInfo._id) ? (
              <Button variant="outline-dark like-btn" onClick={likeHandler}>
                {blog.likes.length}{" "}
                <i style={{ color: "red" }} className=" fas fa-heart"></i>
              </Button>
            ) : (
              <Button variant="outline-dark like-btn" onClick={likeHandler}>
                {blog.likes.length}{" "}
                <i style={{ color: "red" }} className="far fa-heart"></i>
              </Button>
            )}
          </Col>
          <Col md={3}>
            <Button
              onClick={handleCreateCommentShow}
              variant="outline-dark like-btn"
            >
              Leave a Comment
            </Button>
            <Modal show={createCommentShow} onHide={handleCreateCommentClose}>
              <Modal.Header closeButton>
                <Modal.Title>Leave a Comment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormContainer>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="comment">
                      <Form.Control
                        onChange={(e) => setComment(e.target.value)}
                        as="textarea"
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      variant="dark-btn"
                      type="submit"
                      onClick={handleCreateCommentClose}
                    >
                      Reply
                    </Button>
                  </Form>
                </FormContainer>
              </Modal.Body>
            </Modal>
          </Col>
          {blog.replies.length > 0 && (
            <Col md={3}>
              <Button
                onClick={handleViewCommentShow}
                variant="outline-dark like-btn"
              >
                View Comments
              </Button>
              <Modal show={viewCommentShow} onHide={handleViewCommentClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Post Replies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {blog.replies.map((r) => (
                    <Card className="mb-1" key={r._id}>
                      {" "}
                      <Card.Body>
                        <Card.Title>
                          <Row className="d-flex justify-content-between">
                            <Col md={10}>{r.username}</Col>
                            {userInfo && userInfo._id === r.userid && (
                              <Col md={1}>
                                <Button
                                  variant="outline-dark delete-btn"
                                  onClick={() =>
                                    dispatch(deleteCommentBlog(blog._id, r._id))
                                  }
                                >
                                  <i
                                    style={{ color: "red" }}
                                    className="text-right fas fa-times"
                                  ></i>
                                </Button>
                              </Col>
                            )}
                          </Row>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                          {r.createdAt.toString().substring(0, 10)}
                        </Card.Subtitle>
                        <Card.Text>{r.comment}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </Modal.Body>
              </Modal>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BlogPost;
