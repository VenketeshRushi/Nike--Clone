import { getItem } from "../../../utils/cookiestorage";
import {
  GET_TOKEN,
  REMOVE_TOKEN,
  SHOW_LOGIN_PAGE,
  SHOW_RESET_PAGE,
  RESET_PASSWORD,
  RESET_PASSWORD_REMOVE,
} from "./actionTypes";

const init = {
  isLogin: false,
  isReset: false,
  token: getItem("token") || false,
  user: getItem("user") || {},
  resetemail: "",
};

export const authReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SHOW_LOGIN_PAGE:
      return { ...state, isLogin: !state.isLogin, isReset: false };
    case SHOW_RESET_PAGE:
      return { ...state, isReset: !state.isReset, isLogin: false };
    case GET_TOKEN:
      console.log(payload);
      return { ...state, token: payload.token, user: payload.user };
    case REMOVE_TOKEN:
      return { ...state, token: false, user: {} };
    case RESET_PASSWORD: {
      return {
        ...state,
        resetemail: payload,
      };
    }
    case RESET_PASSWORD_REMOVE: {
      return {
        ...state,
        resetemail: "",
      };
    }
    default:
      return state;
  }
};
