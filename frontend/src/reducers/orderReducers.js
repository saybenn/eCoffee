import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_RESET,
  PAY_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_RESET,
  DELIVER_ORDER_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
} from "../constants/orderConstants";

export const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return { loading: true };
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const orderAllReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, success: false };
    case ORDER_LIST_SUCCESS:
      return {
        success: false,
        loading: false,
        orders: action.payload.orders,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_RESET:
      return { success: true };
    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true, success: false };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ORDER_SUCCESS:
      return { ...state, loading: false, shippingAddress: action.payload };
    case UPDATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return { loading: true };
    case PAY_ORDER_SUCCESS:
      return { loading: false, success: true };
    case PAY_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case PAY_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVER_ORDER_REQUEST:
      return { loading: true };
    case DELIVER_ORDER_SUCCESS:
      return { loading: false, success: true };
    case DELIVER_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case DELIVER_ORDER_RESET:
      return {};
    default:
      return state;
  }
};
