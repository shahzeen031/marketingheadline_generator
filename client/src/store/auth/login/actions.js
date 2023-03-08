import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
} from "./actionTypes"

import axios from "axios";

export const loginUser = async (user, history) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth', user);

    if (res.data && res.data.response) {
      localStorage.setItem("token", res.data.response);
      return {
        type: LOGIN_SUCCESS,
        payload: res.data.response,
      };
    }

    return {
      type: API_ERROR,
      payload: res.data.errors[0].message,
    };
  }
  catch (e) {
    return {
      type: API_ERROR,
      payload: e.response.data.errors[0].message,
    };
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
  }
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}
