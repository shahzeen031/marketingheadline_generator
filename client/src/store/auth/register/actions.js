import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

import axios from "axios";

export const registerUser = async user => {
  try {
    const res = await axios.post('http://localhost:5000/api/user', user);
    if (res.data && res.data.user) {
      return {
        type: REGISTER_USER_SUCCESSFUL,
        payload: res.data.user,
      };
    }

    return {
      type: REGISTER_USER_FAILED,
      payload: res.data.errors[0].message,
    };
  }
  catch (e) {
    return {
      type: REGISTER_USER_FAILED,
      payload: e.response.data.errors[0].message,
    };
  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}
