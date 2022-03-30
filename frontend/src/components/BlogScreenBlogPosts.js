import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Toast,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "./FormContainer";
import {
  likeBlog,
  commentBlog,
  deleteCommentBlog,
} from "../actions/blogActions";
import Message from "./Message";

const BlogScreenBlogPosts = ({ blog }) => {
  const [message, setMessage] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [comment, setComment] = useState("");

  const commentCloseHandler = () => setCommentShow(false);
  const commentShowHandler = () => setCommentShow(true);

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

  const commentHandler = (e) => {
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
    <>
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
      <Modal show={commentShow} onHide={commentCloseHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {blog.replies > 0 ? (
            blog.replies.map((r) => {
              return (
                <ListGroupItem className="mb-1" key={r._id}>
                  {" "}
                  <Card.Body>
                    <Card.Title>
                      <Row className="d-flex justify-content-between">
                        <Col md={10}>
                          {r.username}
                          {" - "}
                          <small className="text-muted">
                            {r.createdAt.substring(0, 10)}
                          </small>
                        </Col>
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
                    <Card.Text>{r.comment}</Card.Text>
                  </Card.Body>
                </ListGroupItem>
              );
            })
          ) : (
            <Message variant="secondary">
              No comments yet. Be the first to leave one?
            </Message>
          )}
          <hr />
          <FormContainer>
            <Form onSubmit={commentHandler}>
              <Form.Label className="mt-3">Leave a Comment</Form.Label>
              <Form.Group controlId="comment">
                <Form.Control
                  onChange={(e) => setComment(e.target.value)}
                  as="textarea"
                ></Form.Control>
              </Form.Group>
              <Button
                variant="btn btn-light"
                type="submit"
                onClick={commentCloseHandler}
              >
                Reply
              </Button>
            </Form>
          </FormContainer>
        </Modal.Body>
      </Modal>
      <Card className="blogscreen-card m-3" key={blog._id}>
        <Link to={`/blog/${blog._id}`} className="blogcard-top">
          {" "}
          <Card.Img className="blogcard-image" variant="top" src={blog.image} />
          <div className="blogcard-intro">
            <h4>{blog.title}</h4>
            <h5>{blog.author}</h5>
          </div>
        </Link>
        <ListGroupItem>
          <Link to={`/blog/${blog._id}`}>
            {blog.description.length > 150 ? (
              <p>{`${blog.description.substring(0, 150)} ...Read More`}</p>
            ) : (
              <p>{blog.description}</p>
            )}
          </Link>
        </ListGroupItem>
        <Card.Footer>
          <small className="text-muted align-items-center justify-content-between d-flex">
            <Col md={8}>{blog.createdAt.substring(0, 10)}</Col>

            <div>
              {" "}
              {userInfo && blog.likes.find((l) => l.userid === userInfo._id) ? (
                <Button
                  variant="outline-dark"
                  className="blog-action-btn"
                  onClick={likeHandler}
                >
                  {blog.likes.length}{" "}
                  <i style={{ color: "red" }} className=" fas fa-heart"></i>
                </Button>
              ) : (
                <Button
                  variant="outline-dark"
                  className="blog-action-btn"
                  onClick={likeHandler}
                >
                  {blog.likes.length}{" "}
                  <i style={{ color: "red" }} className="far fa-heart"></i>
                </Button>
              )}
              {"   "}
              <Button
                onClick={commentShowHandler}
                variant="outline-dark"
                className="blog-action-btn"
              >
                {blog.replies.length && blog.replies.length}{" "}
                <i
                  style={{ color: "rgb(195, 216, 226)" }}
                  className="fa-solid fa-comment"
                ></i>
              </Button>
            </div>
          </small>
        </Card.Footer>
      </Card>
    </>
  );
};

export default BlogScreenBlogPosts;
