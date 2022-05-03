import { createStore } from "redux";
import { LOGIN, LOGOUT } from "./constants";

const initialState = { token: "null" };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { token: action.payload };

    case LOGOUT:
      return { token: null };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
