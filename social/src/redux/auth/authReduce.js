/**
 * create auth reducer
 *
 */

import {
  FEATURED_SLIDER_UPDATE,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_USER_FAILED,
  TOKEN_USER_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_COVER_PHOTO_UPDATE,
  USER_PROFILE_PHOTO_UPDATE,
  USER_PROFILE_UPDATE,
  USER_SAVE_INFO_UPDATE,
} from "./actionType.js";
import initialState from "./initialState";

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginState: false,
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginState: true,
        user: payload,
        loading: false,
      };

    case TOKEN_USER_SUCCESS:
      return {
        ...state,
        loginState: true,
        user: payload,
      };

    case TOKEN_USER_FAILED:
      return {
        ...state,
        loginState: false,
        user: null,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loginState: false,
        user: null,
      };
    case USER_PROFILE_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case USER_SAVE_INFO_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };

    case USER_PROFILE_PHOTO_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case USER_PROFILE_COVER_PHOTO_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case FEATURED_SLIDER_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload 
        },
      };

    default:
      return state;
  }
};
//export authReducer
export default authReducer;
