// create user register

import axios from "axios";
import Cookies from "js-cookie";

import createToaste from "../../Pages/utility/toastMessage";
import { LOADER_START } from "../top-loader/loaderType";
import {
  FEATURED_SLIDER_UPDATE,
  GET_ALL_USERS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_USER_FAILED,
  TOKEN_USER_REQ,
  TOKEN_USER_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_COVER_PHOTO_UPDATE,
  USER_PROFILE_PHOTO_UPDATE,
  USER_PROFILE_UPDATE,
  USER_SAVE_INFO_UPDATE,
} from "./actionType";

// user register
export const userRegister =
  (data, setInput, e, setRegister, navigate) => async (dispatch) => {
    try {
      // register request
      dispatch({
        type: REGISTER_REQUEST,
      });

      await axios
        .post("/api/v1/user/register", data)
        .then((res) => {
          createToaste("User Register successful", "success");
          // register success
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.message,
          });
          // clear input fields
          setInput({
            fname: "",
            sname: "",
            emailOrPhone: "",
            password: "",
            day: "",
            month: "",
            year: "",
            gender: "",
          });
          // reset form
          e.target.reset();
          // register modal disapier
          setRegister(false);
          // navigate to activate page
          navigate("/authentic/account");
        })
        .catch((err) => {
          createToaste(err.response.data.message, "error");

          dispatch({
            type: REGISTER_FAILED,
            payload: err.response.data,
          });
        });
    } catch (error) {
      createToaste(error.response.data.message, "error");
      dispatch({
        type: REGISTER_FAILED,
        payload: error.response.data,
      });
    }
  };

// user activation by otp

export const accountActivateByOtp =
  ({ code, email }, navigate) =>
  async (dispatch) => {
    try {
      await axios
        .post("/api/v1/user/code-activate", {
          code: code,
          email: email,
        })
        .then((res) => {
          createToaste("Account Activate successful", "success");
          navigate("/");
        })
        .catch((err) => {
          createToaste(err.response.data.message, "warn");
        });
    } catch (error) {
      createToaste(error.message, "warn");
    }
  };

// resend link
export const resendActivationLink =
  ({ email }, navigate) =>
  async (dispatch) => {
    try {
      await axios
        .post("/api/v1/user/resend-link", {
          auth: email,
        })
        .then((res) => {
          createToaste(res.data.message, "success");
        })
        .catch((err) => {
          createToaste(err.response.data.message, "warn");
        });
    } catch (error) {
      createToaste(error.message, "warn");
    }
  };

// find account
export const findAccount =
  ({ auth }, navigate) =>
  async (dispatch) => {
    try {
      if (auth) {
        await axios
          .post("/api/v1/user/find-user-account", {
            auth: auth,
          })
          .then((res) => {
            navigate("/find-account");
          })
          .catch((err) => {
            createToaste(err.response.data.message, "warn");
          });
      }
    } catch (error) {
      createToaste(error.message, "warn");
    }
  };

// check valid user for reset password
export const checkResetPasswordOTP = (data, navigate) => async (dispatch) => {
  try {
    const checkResetPasswordOtp = await axios
      .post("/api/v1/user/check-password-link-otp", {
        code: data.code,
        auth: data.auth,
      })
      .then((res) => {
        createToaste(res.data.message, "success");
        navigate("/change-password");
      })
      .catch((err) => {
        createToaste(err.response.data.message, "warn");
      });
  } catch (error) {
    createToaste(error.message, "warn");
  }
};

// now change password
export const changePassword = (data, navigate) => async (dispatch) => {
  try {
    await axios
      .post("/api/v1/user/user-reset-password", {
        id: data.id,
        code: data.code,
        password: data.password,
      })
      .then((res) => {
        createToaste(res.data.message, "success");
        navigate("/login");
      })
      .catch((err) => {
        createToaste(err.response.data.message, "warn");
      });
  } catch (error) {
    createToaste(error.message, "warn");
  }
};

// user login
export const userLogin = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    await axios
      .post("/api/v1/user/login", {
        auth: data.auth,
        password: data.password,
      })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.user,
        });
        dispatch({
          type: LOADER_START,
        });
        createToaste(res.data.message, "success");
        navigate("/");
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
        createToaste(err.response.data.message, "warn");
      });
  } catch (error) {
    createToaste(error.message, "warn");
  }
};

// user login
export const tokenUser = (navigate) => async (dispatch) => {
  const token = Cookies.get("authToken");
  try {
    dispatch({
      type: TOKEN_USER_REQ,
    });
    await axios
      .get("/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: TOKEN_USER_SUCCESS,
          payload: res.data.user,
        });
        dispatch({
          type: LOADER_START,
        });
        createToaste(res.data.message, "success");
      })
      .catch((err) => {
        dispatch({
          type: TOKEN_USER_FAILED,
        });
        dispatch(userLogout());
        createToaste(err.response.data.message, "warn");
      });
  } catch (error) {
    dispatch({
      type: TOKEN_USER_FAILED,
    });
    dispatch(userLogout());
    createToaste(error.message, "warn");
  }
};

//  user logout
export const userLogout = (navigate) => (dispatch) => {
  dispatch({
    type: LOADER_START,
  });
  Cookies.remove("authToken");
  dispatch({
    type: USER_LOGOUT,
  });
  navigate("/");
};

// user profile updater

export const userUpdateProfile = (data, id, setBioShow) => async (dispatch) => {
  try {
    await axios
      .put(`/api/v1/user/profile-updater/${id}`, data)
      .then((res) => {
        setBioShow(false);
        dispatch({
          type: USER_PROFILE_UPDATE,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const saveInfoModal = (data, setEnableProfile) => async (dispatch) => {
  try {
    dispatch({ type: USER_SAVE_INFO_UPDATE, payload: data });
    setEnableProfile(true);
  } catch (error) {
    console.log(error.message);
  }
};

//user profile photo update

export const userProfilePhotoUpdater =
  (id, form_data, setProfilePhotoUpdate, setImage) => async (dispatch) => {
    try {
      await axios
        .put(`/api/v1/user/profile-photo-update/${id}`, form_data)
        .then((res) => {
          setProfilePhotoUpdate(false);
          setImage();
          dispatch({
            type: USER_PROFILE_PHOTO_UPDATE,
            payload: {
              profile_photo: res.data.filename,
            },
          });
        });
    } catch (error) {
      console.log(error.mesage);
    }
  };

// cover photo update
export const userProfileCoverPhotoUpdater =
  (id, data_form, setCoverPhoto, setImage) => async (dispatch) => {
    try {
      await axios
        .put(`/api/v1/user/profile-cover-photo-update/${id}`, data_form)
        .then((res) => {
          setCoverPhoto(false);
          setImage();
          dispatch({
            type: USER_PROFILE_COVER_PHOTO_UPDATE,
            payload: {
              cover_photo: res.data.filename,
            },
          });
        });
    } catch (error) {
      console.log(error.mesage);
    }
  };
// cover photo update
export const featuredPhotoUpdater =
  (id, data, setSliderInput, setFeaturedUploadShow, setFeaturedAdd) =>
  async (dispatch) => {
    try {
      await axios
        .post(`/api/v1/user/featured-slider/${id}`, data)
        .then((res) => {
          setSliderInput("");
          setFeaturedAdd(false);
          setFeaturedUploadShow(false);
          dispatch({
            type: FEATURED_SLIDER_UPDATE,
            featured: res.data.featured,
          });
          //  console.log(res.data)
        });
    } catch (error) {
      console.log(error.mesage);
    }
  };

// get all users

export const getAllUser = (id) => async (dispatch) => {
  try {
    axios
      .get(`/api/v1/user/get-all-user/${id}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data.users,
        });
      })
      .catch((err) => {
        createToaste(err.data.message, "warn");
      });
  } catch (error) {
    console.log(error);
  }
};
