import axios from "axios";
import {
  BLOG_COMMENT_FAIL,
  BLOG_COMMENT_REQUEST,
  BLOG_COMMENT_SUCCESS,
  BLOG_LIKE_FAIL,
  BLOG_LIKE_REQUEST,
  BLOG_LIKE_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG_COMMENT_FAIL,
  DELETE_BLOG_COMMENT_REQUEST,
  DELETE_BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  GET_MY_BLOGS_FAIL,
  GET_MY_BLOGS_REQUEST,
  GET_MY_BLOGS_SUCCESS,
  SINGLE_BLOG_FAIL,
  SINGLE_BLOG_REQUEST,
  SINGLE_BLOG_SUCCESS,
  TOP_BLOG_FAIL,
  TOP_BLOG_REQUEST,
  TOP_BLOG_SUCCESS,
} from "../constants/blogConstants";

export const listBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });

    const { data } = await axios.get("api/blogs");

    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const topBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_BLOG_REQUEST });

    const { data } = await axios.get("api/blogs/top");

    dispatch({ type: TOP_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOP_BLOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likeBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_LIKE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post("api/blogs/like", { id }, config);

    dispatch({ type: BLOG_LIKE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BLOG_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const commentBlog = (comment, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_COMMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/blogs/reply",
      { comment, id },
      config
    );

    dispatch({ type: BLOG_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBlogPost =
  (title, body, image, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_BLOG_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/blogs/",
        { title, body, image, description },
        config
      );

      dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_BLOG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteBlogPost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    await axios.delete("api/blogs/", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: { id },
    });

    dispatch({ type: DELETE_BLOG_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCommentBlog =
  (blogId, commentId) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_BLOG_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      await axios.delete("api/blogs/reply", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        data: { blogId, commentId },
      });

      dispatch({ type: DELETE_BLOG_COMMENT_SUCCESS });
    } catch (error) {
      dispatch({
        type: DELETE_BLOG_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_BLOG_REQUEST });

    const { data } = await axios.get(`/api/blogs/${id}`);

    dispatch({ type: SINGLE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_BLOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyBlogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_BLOGS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("api/blogs/profile", config);

    dispatch({ type: GET_MY_BLOGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MY_BLOGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
