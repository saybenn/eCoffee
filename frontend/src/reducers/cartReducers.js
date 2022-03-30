import {
  ADD_CART_FAIL,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_RESET,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  CONTROL_CART_REQUEST,
  CONTROL_CART_SUCCESS,
  CONTROL_CART_FAIL,
} from "../constants/cartConstants";

export const cartAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CART_REQUEST:
      return { loading: true, success: null };
    case ADD_CART_SUCCESS:
      return { loading: false, success: true };
    case ADD_CART_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ADD_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const cartGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { loading: true };
    case GET_CART_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case GET_CART_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cartControlReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTROL_CART_REQUEST:
      return { loading: true };
    case CONTROL_CART_SUCCESS:
      return { loading: false, success: true };
    case CONTROL_CART_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
