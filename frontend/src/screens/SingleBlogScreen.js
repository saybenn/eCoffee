import React, { useEffect } from "react";
import { Markup } from "interweave";
import { Image, Col, Row, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getSingleBlog } from "../actions/blogActions";
import BlogContainer from "../components/BlogContainer";

const SingleBlogScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const singleBlog = useSelector((state) => state.singleBlog);
  const { blog, error } = singleBlog;

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [id, dispatch]);

  return (
    <BlogContainer>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : blog ? (
        <Col>
          <Image
            className="soloblog-img img-fluid rounded mx-auto d-block"
            src={blog.image}
          />
          <h1 className="mt-3">{blog.title}</h1>
          <p className="text-muted">
            {blog.author} - {blog.createdAt.substring(0, 10)}
          </p>

          <Markup content={blog.body} />
          <hr />
          <h3>Comments</h3>
          {blog.replies.length === 0 && (
            <Message variant="info">Be the first to leave a comment!</Message>
          )}
          {blog.replies.map((r) => {
            return (
              <ListGroup.Item key={r._id}>
                <Row className="justify-space-between">
                  <strong>{r.username}</strong>
                </Row>
                <p className="text-muted">{r.createdAt.substring(0, 10)}</p>
                <p>{r.comment}</p>
              </ListGroup.Item>
            );
          })}
        </Col>
      ) : (
        <Loader />
      )}
    </BlogContainer>
  );
};

export default SingleBlogScreen;
