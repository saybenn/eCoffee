import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Container from "../components/Container";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";

const UserEditScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [isAuthor, setIsAuthor] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (user === undefined || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsAuthor(user.isAuthor);
    }
  }, [dispatch, id, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, name, email, isAdmin, isAuthor));
    navigate("/admin/userlist");
  };
  return (
    <>
      <Container>
        <Link to="/admin/userlist" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1>Edit User</h1>
          {loading && <Loader />}
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : user ? (
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
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="isadmin">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Form.Group controlId="isauthor">
                <Form.Check
                  type="checkbox"
                  label="Is Author"
                  checked={isAuthor}
                  onChange={(e) => setIsAuthor(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          ) : (
            <Loader />
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default UserEditScreen;
