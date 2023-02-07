import axios from "axios";
import { useSelector } from "react-redux";
import { setToast } from "../../../utils/extraFunctions";
import { removeItem, setItem } from "../../../utils/cookiestorage";
import {
  GET_TOKEN,
  REMOVE_TOKEN,
  SHOW_LOGIN_PAGE,
  SHOW_RESET_PAGE,
  RESET_PASSWORD,
  RESET_PASSWORD_REMOVE,
} from "./actionTypes";
import Cookies from "js-cookie";

export const showLoginPage = () => ({ type: SHOW_LOGIN_PAGE });

export const showResetPage = () => ({ type: SHOW_RESET_PAGE });

export const getToken = (payload) => ({ type: GET_TOKEN, payload });

export const removeToken = () => ({ type: REMOVE_TOKEN });

export const getSignupSuccess = (data, toast, navigate) => async (dispatch) => {
  try {
    let res = await axios.post(`/users/signup`, data);
    res = res.data;
    dispatch(getToken(res));
    setItem("token", res.token);
    setItem("user", res.user);
    setToast(toast, "Signup successfully", "success");
    navigate(-1);
  } catch (err) {
    console.log(err);
    setToast(
      toast,
      err.response.data.message
        ? err.response.data.message
        : "Invalid Credintial !",
      "error"
    );
  }
};

export const getLoginSuccess = (data, toast, navigate) => async (dispatch) => {
  try {
    let res = await axios.post(`/users/login`, data);
    res = res.data;
    dispatch(getToken(res));
    setItem("token", res.token);
    setItem("user", res.user);
    setToast(toast, "Login Successfully", "success");
    navigate(-1);
  } catch (err) {
    console.log(err);
    setToast(
      toast,
      err.response.data.message
        ? err.response.data.message
        : "Invalid Credintial !",
      "error"
    );
  }
};

export const logoutFromAccount = (toast) => (dispatch) => {
  try {
    removeItem("token");
    removeItem("user");
    dispatch(removeToken());
    setToast(toast, "Logout Successfully", "success");
  } catch (err) {
    console.log(err);
    setToast(toast, "Something went wrong", "error");
  }
};

export const resetpassword = (data, toast, navigate) => async (dispatch) => {
  try {
    let res = await axios.post("/users/checkmail", {
      data,
    });
    dispatch({
      type: RESET_PASSWORD,
      payload: res.data.email,
    });
    Cookies.set("otp", res.data.otp, {
      expires: new Date(new Date().getTime() + 5 * 60 * 1000),
    });
    setToast(toast, "Reset OTP Sent To Your Email", "success");
    navigate("/resetpassword");
  } catch (error) {
    setToast(toast, error.response.data.message, "error");
  }
};

export const resetpasswordremove = () => ({
  type: RESET_PASSWORD_REMOVE,
});
