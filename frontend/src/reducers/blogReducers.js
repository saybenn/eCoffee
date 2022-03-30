import {
  BLOG_COMMENT_FAIL,
  BLOG_COMMENT_REQUEST,
  BLOG_COMMENT_SUCCESS,
  BLOG_LIKE_FAIL,
  BLOG_LIKE_REQUEST,
  BLOG_LIKE_SUCCESS,
  BLOG_LIKE_RESET,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  TOP_BLOG_FAIL,
  TOP_BLOG_REQUEST,
  TOP_BLOG_SUCCESS,
  GET_MY_BLOGS_FAIL,
  GET_MY_BLOGS_REQUEST,
  GET_MY_BLOGS_SUCCESS,
  SINGLE_BLOG_REQUEST,
  SINGLE_BLOG_SUCCESS,
  SINGLE_BLOG_FAIL,
  DELETE_BLOG_COMMENT_REQUEST,
  DELETE_BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
} from "../constants/blogConstants";

export const blogListReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_LIKE_REQUEST:
      return { loading: true };
    case BLOG_LIKE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_LIKE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_LIKE_RESET:
      return {};
    default:
      return state;
  }
};

export const blogCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_COMMENT_REQUEST:
      return { loading: true };
    case BLOG_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case BLOG_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BLOG_REQUEST:
      return { loading: true };
    case CREATE_BLOG_SUCCESS:
      return { loading: false, blog: action.payload, success: true };
    case CREATE_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogPostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BLOG_REQUEST:
      return { loading: true };
    case DELETE_BLOG_SUCCESS:
      return { loading: false, success: true };
    case DELETE_BLOG_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const blogCommentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BLOG_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_BLOG_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_BLOG_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case TOP_BLOG_REQUEST:
      return { loading: true };
    case TOP_BLOG_SUCCESS:
      return { loading: false, blogs: action.payload };
    case TOP_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_BLOG_REQUEST:
      return { loading: true };
    case SINGLE_BLOG_SUCCESS:
      return { loading: false, blog: action.payload };
    case SINGLE_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_BLOGS_REQUEST:
      return { loading: true };
    case GET_MY_BLOGS_SUCCESS:
      return { loading: false, blogs: action.payload };
    case GET_MY_BLOGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
