import axios from "axios";
import {
  ADD_CART_FAIL,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  CONTROL_CART_FAIL,
  CONTROL_CART_REQUEST,
  CONTROL_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
} from "../constants/cartConstants";

export const addItemToCart =
  (name, price, image, _id, qty, options = null, optionName = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_CART_REQUEST });
      console.log(name, price, image, _id, qty, options);
      const {
        userLogin: { userInfo },
      } = getState();
      console.log(userInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/cart",
        { name, price, image, _id, qty, options, optionName },
        config
      );
      console.log(data);
      dispatch({ type: ADD_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_CART_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const controlCart = (_id, input) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTROL_CART_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put("/api/cart", { _id, input }, config);

    dispatch({ type: CONTROL_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTROL_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/cart", config);

    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
