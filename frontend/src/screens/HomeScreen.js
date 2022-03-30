import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree, faCoffee, faPen } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import Loader from "../components/Loader";
import Message from "../components/Message";
import BlogPost from "../components/BlogPost";
import PillarCarousel from "../components/PillarCarousel";
import { topBlogs } from "../actions/blogActions";
import HorizontalCarousel from "../components/HorizontalCarousel";
import TopProductsCarousel from "../components/TopProductsCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const blogLike = useSelector((state) => state.blogLike);
  const { success: likeSuccess } = blogLike;
  const blogComment = useSelector((state) => state.blogComment);
  const { success: commentSuccess } = blogComment;
  const blogCommentDelete = useSelector((state) => state.blogCommentDelete);
  const { success: deleteCommentSuccess } = blogCommentDelete;
  const blogDeletePost = useSelector((state) => state.blogDeletePost);
  const { success: deleteBlogSuccess } = blogDeletePost;
  const topBlog = useSelector((state) => state.topBlog);
  const { loading: blogLoading, error: blogError, blogs } = topBlog;

  useEffect(() => {
    if (
      likeSuccess ||
      commentSuccess ||
      deleteCommentSuccess ||
      deleteBlogSuccess
    ) {
      dispatch(topBlogs());
    } else {
      dispatch(topBlogs());
    }
  }, [
    dispatch,
    likeSuccess,
    deleteBlogSuccess,
    commentSuccess,
    deleteCommentSuccess,
  ]);
  return (
    <>
      <HorizontalCarousel />
      <Container>
        <hr className="my-5 styletwo" />
        <Row className="d-flex align-items-center justify-content-between my-5">
          <Col md={8}>
            <h1 className="mt-5 mb-3">Featured Products</h1>
            <TopProductsCarousel />
          </Col>
          <Col md={4}>
            <div className="triangle">
              <FontAwesomeIcon icon={faCoffee} />{" "}
              <FontAwesomeIcon className="tree" icon={faTree} />{" "}
              <FontAwesomeIcon icon={faPen} />{" "}
            </div>
            <h2 className="text-center my-3">Who We Are</h2>
            <p className="mission-statement align-items-end">
              Our mission at eCo is not only to introduce customers to
              environmentally friendly goods for all their coffee needs, but
              also host a space for writers of all backgrounds to express and
              share their thoughts and passion with others.{" "}
            </p>
          </Col>
        </Row>
        <hr className="my-5 style-two" />

        {blogLoading ? (
          <Loader />
        ) : blogError ? (
          <Message variant="danger">{blogError}</Message>
        ) : (
          <Row className="my-5">
            <h1 className="mt-5 mb-3">Top Blog Posts</h1>
            <Col>
              {blogs &&
                blogs
                  .sort((a, b) => b.numLikes - a.numLikes)
                  .map((blog) => {
                    return <BlogPost key={blog._id} blog={blog} />;
                  })}{" "}
            </Col>

            <Col md={4}>
              <PillarCarousel className="my-3" />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
