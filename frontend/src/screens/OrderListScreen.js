import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import { ORDER_LIST_RESET } from "../constants/orderConstants";
import Paginate from "../components/Paginate";

const OrderListScreen = () => {
  //Hooks
  const [hidePaid, setHidePaid] = useState("");
  const [hideDelivered, setHideDelivered] = useState("");
  const [newest, setNewest] = useState(true);

  const pageName = "orderlist";
  const { pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Selectors
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderAll = useSelector((state) => state.orderAll);
  const { loading, error, orders, page, pages, success } = orderAll;

  //UseEffect
  useEffect(() => {
    if ((userInfo && !userInfo.isAdmin) || userInfo === null) {
      navigate("/login");
    }
    dispatch(listOrders(pageNumber));

    if (success) {
      dispatch(listOrders(pageNumber));
    }
  }, [dispatch, pageNumber, navigate, success, userInfo]);

  //Handlers
  const handleNewest = () => {
    if (newest) {
      setNewest(false);
    } else {
      setNewest(true);
    }
  };

  const handleHidePaid = () => {
    if (hidePaid === "") {
      setHidePaid(true);
    }
    if (hidePaid === true) {
      setHidePaid(false);
    }
    if (hidePaid === false) {
      setHidePaid("");
    }
    dispatch({ type: ORDER_LIST_RESET });
  };

  const handleHideDelivered = () => {
    if (hideDelivered === "") {
      setHideDelivered(true);
    }
    if (hideDelivered === true) {
      setHideDelivered(false);
    }
    if (hideDelivered === false) {
      setHideDelivered("");
    }
    dispatch({ type: ORDER_LIST_RESET });
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <h1>Order List</h1>
          </Col>
          <Col md={2} className=" d-flex justify-content-end">
            <Button className="my-3" onClick={handleNewest}>
              {newest ? "Oldest 1st" : "Newest 1st"}
            </Button>
          </Col>
          <Col md={2} className=" d-flex justify-content-end">
            <Button className="my-3" onClick={handleHidePaid}>
              <i className="fa-solid fa-dollar-sign"></i>{" "}
              {hidePaid === ""
                ? "Hide Paid Orders"
                : hidePaid === true
                ? "Show Paid Orders"
                : "Show Both"}
            </Button>
          </Col>
          <Col
            md={3}
            className=" d-flex justify-content-end"
            onClick={handleHideDelivered}
          >
            <Button className="my-3">
              <i className="fa-solid fa-envelope"></i>{" "}
              {hideDelivered === ""
                ? "Hide Delivered Orders"
                : hideDelivered === true
                ? "Show Delivered Orders"
                : "Show Both"}
            </Button>
          </Col>
        </Row>
        {loading && <Loader />}{" "}
        {error && <Message variant="danger">{error}</Message>}
        {orders && (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((o) => {
                    return o.isPaid !== hidePaid;
                  })
                  .filter((ord) => {
                    return ord.isDelivered !== hideDelivered;
                  })
                  .sort((a, b) => {
                    return newest
                      ? Date.parse(b.createdAt) - Date.parse(a.createdAt)
                      : Date.parse(a.createdAt) - Date.parse(b.createdAt);
                  })
                  .map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.slice(0, 10)}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>

                      {order.isPaid ? (
                        <td>
                          <i
                            className="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                          {order.paidAt.slice(0, 10)}
                        </td>
                      ) : (
                        <td>
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        </td>
                      )}

                      {order.isDelivered ? (
                        <td>{order.deliveredAt.slice(0, 10)}</td>
                      ) : (
                        <td>
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        </td>
                      )}

                      <td>
                        <LinkContainer to={`/order/review/${order._id}`}>
                          <Button variant="light" className="btn-sm">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Paginate
              pages={pages}
              page={page}
              isAdmin={true}
              pageName={pageName}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default OrderListScreen;
