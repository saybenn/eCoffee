import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import { USER_LIST_RESET } from "../constants/userConstants";

const UserListScreen = () => {
  const [deleteState, setDeleteState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch({ type: USER_LIST_RESET });

    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
    setDeleteState(false);
  }, [dispatch, deleteState, userInfo, navigate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) dispatch(deleteUser(id));
    setDeleteState(true);
  };
  return (
    <>
      <Container>
        <h1>Users</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>AUTHOR</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {user.isAuthor ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : user.authorRequest ? (
                        <i className="fas fa-pen-square"></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default UserListScreen;
