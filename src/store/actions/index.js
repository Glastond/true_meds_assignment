import { LOGIN, LOGOUT } from "../constants";

export const loginUser = (token) => {
  return { type: LOGIN, payload: token };
};

export const logoutUser = () => {
  return { type: LOGOUT };
};
