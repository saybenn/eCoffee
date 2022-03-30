import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal, Button, Form, Toast, Card } from "react-bootstrap";
import Container from "../components/Container";
import BlogScreenBlogPosts from "../components/BlogScreenBlogPosts";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listBlogs, createBlogPost } from "../actions/blogActions";
import Tippy from "@tippy.js/react";
import { requestAuthorship } from "../actions/userActions";

const BlogScreen = () => {
  const [convertedText, setConvertedText] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("false");
  const [toastShow, setToastShow] = useState(false);
  const [postShow, setPostShow] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const handlePostClose = () => setPostShow(false);
  const handlePostShow = () => setPostShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userAuthor = useSelector((state) => state.userAuthor);
  const { success: authorSuccess } = userAuthor;

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const createBlog = useSelector((state) => state.createBlog);
  const { success } = createBlog;

  const blogDeletePost = useSelector((state) => state.blogDeletePost);
  const { success: deleteSuccess } = blogDeletePost;

  const blogLike = useSelector((state) => state.blogLike);
  const { success: likeSuccess } = blogLike;
  const blogComment = useSelector((state) => state.blogComment);
  const { success: commentSuccess } = blogComment;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBlogs());

    if (authorSuccess) {
      setMessage(`Your request for the author role has been received.`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    }
  }, [
    dispatch,
    success,
    deleteSuccess,
    likeSuccess,
    authorSuccess,
    commentSuccess,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInfo.isAuthor) {
      setToastShow(true);
      setMessage(`Must be an author to make a post.`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    } else {
      dispatch(createBlogPost(postTitle, convertedText, image, description));
      setConvertedText("");
      setDescription("");
      setPostTitle("");
    }
  };

  const authorHandler = () => {
    dispatch(requestAuthorship(userInfo._id));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col md={9} className="d-flex align-items-end">
            <h1>Community Writing Blog</h1>{" "}
            {authorSuccess && <Message variant="info">{message}</Message>}
          </Col>
          <Col md={3} className="d-flex justify-content-end align-items-end">
            {userInfo && userInfo.isAuthor && (
              <Button variant="" onClick={handlePostShow}>
                Create a Post <i className="fas fa-4x fa-edit"></i>
              </Button>
            )}
            {!userInfo.isAuthor && !userInfo.authorRequest && (
              <Button variant="" onClick={authorHandler}>
                Request Author Role <i className="fas fa-4x fa-edit"></i>
                <Tippy
                  content="The Author role allows users to contribute their own blog post to the community. Requests must be approved by an Administrator."
                  placement="top"
                  arrow={false}
                  delay={300}
                >
                  <i className="fas fa-info-circle mx-1"></i>
                </Tippy>
              </Button>
            )}
          </Col>
        </Row>
        <hr
          style={{
            color: "black",
            backgroundColor: "black",
            height: 5,
          }}
        />
        <Modal dialogClassName="w-50" show={postShow} onHide={handlePostClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create A Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContainer>
              <Form onSubmit={submitHandler}>
                <Form.Label>Post Title</Form.Label>
                <Form.Group controlId="title">
                  <Form.Control
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Post Description</Form.Label>
                <Form.Group controlId="description">
                  <Form.Control
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's this blog post about?"
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Post Body</Form.Label>
                <Form.Group controlId="body">
                  <ReactQuill
                    className="mb-2 p-1"
                    theme="snow"
                    value={convertedText}
                    onChange={setConvertedText}
                  />
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    value={image}
                    placeholder="Enter image url"
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    id="image-file"
                    label="Choose File"
                    type="file"
                    onChange={uploadFileHandler}
                  ></Form.Control>
                  {uploading && <Loader />}
                </Form.Group>
                <Button
                  className="my-3"
                  variant="outline-dark"
                  type="submit"
                  onClick={handlePostClose}
                >
                  Submit Blog Post
                </Button>
              </Form>
            </FormContainer>
          </Modal.Body>
        </Modal>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Toast
          onClose={() => setToastShow(false)}
          show={toastShow}
          delay={5000}
          autohide
        >
          <Toast.Header>{message}</Toast.Header>
        </Toast>{" "}
        {blogs && blogs.length > 0 ? (
          <Card>
            <Row className="mb-3">
              {blogs
                .sort(
                  (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
                )
                .map((blog) => {
                  return (
                    <Col key={blog._id} sm={12} md={6} lg={4} xl={4}>
                      <BlogScreenBlogPosts blog={blog} />
                    </Col>
                  );
                })}
            </Row>
          </Card>
        ) : (
          <Message variant="info">
            No Blog Posts. Be the first to contribute to our community!
          </Message>
        )}
      </Container>
    </>
  );
};

export default BlogScreen;
