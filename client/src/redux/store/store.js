import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
import { pathReducer } from "../features/path/reducers";
import { homeReducer } from "../features/home/reducer";
import { authReducer } from "../features/auth/reducer";
import { prodReducer } from "../features/products/reducers";
import thunk from "redux-thunk";
import { cartReducer } from "../features/cart/reducer";
import { favouriteReducer } from "../features/favourite/reducer";

const rootReducer = combineReducers({
  pathReducer,
  homeReducer,
  authReducer,
  prodReducer,
  cartReducer,
  favouriteReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
