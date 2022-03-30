import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_SHIPPING_SAVE_FAIL,
  USER_SHIPPING_SAVE_REQUEST,
  USER_SHIPPING_SAVE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_AUTHOR_FAIL,
  USER_AUTHOR_SUCCESS,
  USER_AUTHOR_REQUEST,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { success: null }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true, success: false };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userDeleteReducer = (state = { success: null }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT_USER_SUCCESS:
      return {};
    case LOGOUT_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAuthorReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTHOR_REQUEST:
      return { loading: true };
    case USER_AUTHOR_SUCCESS:
      return { loading: false, success: true };
    case USER_AUTHOR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_SHIPPING_SAVE_REQUEST:
      return { ...state, loading: true };
    case USER_SHIPPING_SAVE_SUCCESS:
      return { ...state, loading: false, shippingAddress: action.payload };
    case USER_SHIPPING_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
