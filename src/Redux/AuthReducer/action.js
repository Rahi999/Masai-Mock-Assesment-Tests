import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionsType";

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE
  };
};

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};
