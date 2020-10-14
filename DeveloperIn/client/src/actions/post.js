import axios from 'axios';
import { setAlert } from './alerts';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POSTS, ADD_POSTS, GET_POST } from './types';

// Get All Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Like Posts
export const addLikes = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: {id, likes: res.data},
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Unlike Posts
export const removeLikes = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: {id, likes: res.data},
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Delete posts
export const deletePosts = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POSTS,
      payload: id
    })
    dispatch(setAlert("Post Deleted", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Add Posts
export const addPosts = (formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type: ADD_POSTS,
      payload: res.data
    })
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Get a single Post
export const getPost = (id) => async dispatch => {
  console.log(id)
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}